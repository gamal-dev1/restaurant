import { couponModel } from "../../../databases/models/coupon.model.js";
import { catchAsyncError } from "../../middleware/catchAsyncError.js";
import { ApiFeatures } from "../../utils/ApiFeatures.js";
import { AppError } from "../../utils/AppError.js";
import * as factor from "../handlers/factor.handler.js";
import qrcode from 'qrcode'


const createCoupon = catchAsyncError(async (req, res, next) => {
    let result = await couponModel.create(req.body)
    res.status(201).json({ message: 'success created', result })
})

const getCoupon = catchAsyncError(async (req, res, next) => {
    const { id } = req.params
    let result = await couponModel.findById(id)
    if (!result) return next(new AppError('Coupon not found', 404))
    let URL = await qrcode.toDataURL(result.code)
    res.status(200).json({ message: 'success updated', result, URL })
})

const updateCoupon = catchAsyncError(async (req, res, next) => {
    const { id } = req.params
    let result = await couponModel.findByIdAndUpdate(id, req.body, { returnDocument: 'after' })
    if (!result) return next(new AppError('Coupon not found', 404))
    res.status(200).json({ message: 'success updated', result })
})

const getAllCoupons = factor.getAll(couponModel)

const deleteCoupon = factor.deleteOne(couponModel)

export {
    createCoupon,
    getAllCoupons,
    getCoupon,
    updateCoupon,
    deleteCoupon
}
