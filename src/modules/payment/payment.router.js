import express from 'express'
import { createPayment, paymentCancel, paymentSuccess, paymentWebhook } from './payment.controller.js'
import { allowedTo, protectedRoutes } from '../Auth/auth.controller.js'
import { validation } from '../../middleware/validation.js'
import { createOrderSchema } from '../order/order.validation.js'

const paymentRouter = express.Router()

paymentRouter.post('/checkout', protectedRoutes, allowedTo('customer'), validation(createOrderSchema), createPayment)
paymentRouter.post('/webhook', paymentWebhook)
paymentRouter.get('/success', paymentSuccess)
paymentRouter.get('/cancel', paymentCancel)

export default paymentRouter