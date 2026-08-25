import express from 'express'
import * as cart from './cart.controller.js'
import { allowedTo, protectedRoutes } from '../Auth/auth.controller.js'
import { validation } from '../../middleware/validation.js'
import { addToCartSchema, applyCouponSchema, removeFromCartSchema, updateQuantitySchema } from './cart.validation.js'
const cartRouter = express.Router()

cartRouter.route('/')
    .post(protectedRoutes, allowedTo('customer'),validation(addToCartSchema), cart.addToCart)
    .get(protectedRoutes, allowedTo('customer'), cart.getLogedUserCart)
    .put(protectedRoutes, allowedTo('customer'), validation(updateQuantitySchema),cart.updateQuantity)

cartRouter.post('/ApplyCoupon', protectedRoutes, allowedTo('customer'),validation(applyCouponSchema), cart.applyCoupon)
cartRouter.delete('/RemoveCoupon', protectedRoutes, allowedTo('customer'), cart.removeCoupon)


cartRouter.route('/:id')
    .delete(protectedRoutes, allowedTo('customer'),validation(removeFromCartSchema), cart.removeFromCart)
    
export default cartRouter
