import express from 'express'
import * as order from './order.controller.js'
import { allowedTo, protectedRoutes } from '../Auth/auth.controller.js'
import { validation } from '../../middleware/validation.js'
import { createOrderSchema, updateOrderStatusSchema } from './order.validation.js'
const orderRouter = express.Router()

orderRouter.route('/')
    .post(protectedRoutes, allowedTo('customer'), validation(createOrderSchema), order.createCashOrder)
    .get(protectedRoutes, allowedTo('customer'), order.getUserOrder)

orderRouter.get('/All', protectedRoutes, allowedTo('manager','staff'), order.getAllOrders)

orderRouter.patch('/:id/status', protectedRoutes, allowedTo('staff'), validation(updateOrderStatusSchema), order.updateOrderStatus)

export default orderRouter
