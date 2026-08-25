import { cartModel } from "../../../databases/models/cart.model.js";
import { couponModel } from "../../../databases/models/coupon.model.js";
import { orderModel } from "../../../databases/models/order.model.js";
import { catchAsyncError } from "../../middleware/catchAsyncError.js";
import { AppError } from "../../utils/AppError.js";

const createCashOrder = catchAsyncError(async (req, res, next) => {

    let cart = await cartModel.findOne({ user: req.user._id })
    if (!cart || cart.cartItems.length === 0)
        return next(new AppError('Cart is empty, please add items before creating an order', 400))

    let coupon = await couponModel.findById(cart.coupon)

    if (coupon && coupon.usageLimit && coupon.usageCount >= coupon.usageLimit)
        return next(new AppError('Coupon usage limit has been reached', 400))

    let totalPriceAfterDiscount = cart.totalPriceAfterDiscount ?
        cart.totalPriceAfterDiscount : cart.totalPrice

    let order = new orderModel({
        user: req.user._id,
        orderItems: cart.cartItems,
        totalPrice: cart.totalPrice,
        discount: cart.discount,
        discountType: cart.discountType,
        totalPriceAfterDiscount,
        deliveryAddress: req.body.deliveryAddress
    })
    order.orderNumber = parseInt(order._id.toString().slice(-4), 16)
    await order.save()

    if (coupon) {
        coupon.usageCount += 1
        await coupon.save()
    }
    cart.cartItems = []
    cart.totalPrice = 0
    cart.discount = undefined
    cart.discountType = undefined
    cart.totalPriceAfterDiscount = undefined
    cart.coupon = undefined

    await cart.save()
   
    return res.status(201).json({ message: 'success Create Order', order })
})

const getUserOrder = catchAsyncError(async (req, res, next) => {
    let order = await orderModel.find({ user: req.user._id })
    if (!order.length) return next(new AppError('order not found, please create Order first', 404))
    res.json({ message: 'My Orders', order })
})

const getAllOrders = catchAsyncError(async (req, res, next) => {
    let order = await orderModel.find()
    if (!order.length) return next(new AppError('order not found', 404))
    res.json({ message: 'success', Orders: order })
})

const updateOrderStatus = catchAsyncError(async (req, res, next) => {
    const { status } = req.body

    const order = await orderModel.findById(req.params.id)
    if (!order) return next(new AppError('Order not found', 404))

    const allowedTransitions = {
        pending: ['accepted', 'cancelled'],
        accepted: ['preparing', 'cancelled'],
        preparing: ['outForDelivery'],
        outForDelivery: ['delivered'],
        delivered: [],
        cancelled: []
    }

    if (!allowedTransitions[order.status] || !allowedTransitions[order.status].includes(status))
        return next(new AppError(`Cannot change order status from ${order.status} to ${status}`, 400))
    order.status = status

    if (status === 'delivered') order.deliveredAt = new Date()

    if (status === 'cancelled') {
        order.cancellationReason = req.body.cancellationReason || null
        order.cancelledBy = 'staff'
    }
    await order.save()

    const io = req.app.get('io')
    io.to(`order:${order._id}`).emit('orderStatusUpdated', {
        orderId: order._id,
        orderNumber: order.orderNumber,
        status: order.status,
        deliveredAt: order.deliveredAt,
        cancellationReason: order.cancellationReason,
        cancelledBy: order.cancelledBy
    })
    return res.status(200).json({
        message: 'Success Updated Status Order', order: { status: order.status, deliveredAt: order.deliveredAt }
    })
})

export {
    createCashOrder,
    getUserOrder,
    getAllOrders,

    updateOrderStatus
}
