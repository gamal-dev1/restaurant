import { orderModel } from "../../../databases/models/order.model.js"

export const orderSocket = (io) => {

    io.on('connection', (socket) => {
        console.log(`user connected ${socket.id}`)

        socket.on('joinOrder', (orderId) => {
            socket.join(`order:${orderId}`)
            console.log(`${socket.id} joined order:${orderId}`)
        })

        socket.on('joinStaff', () => {
            socket.join('staff')
            console.log(`${socket.id} joined staff room`)
        })

        socket.on('cancelOrderRequest', async (data) => {
            const { orderId, reason } = data
            const order = await orderModel.findById(orderId)
            if (!order) return

            if (!['pending', 'accepted'].includes(order.status)) {
                return socket.emit('cancellationRejected', { orderId, reason: 'Order cannot be cancelled at this stage' })
            }
            io.to('staff').emit('cancelOrderRequest', { orderId, reason })
        })
        
        socket.on('disconnect', () => {
            console.log(`user disconnected ${socket.id}`)
        })

    })
}
