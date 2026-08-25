
import express from 'express'
import * as user from './user.controller.js'
import { allowedTo, protectedRoutes } from '../Auth/auth.controller.js'
import { validation } from '../../middleware/validation.js'
import * as valid from './user.validation.js'
const userRouter = express.Router()

userRouter.route('/')
    .post(protectedRoutes, allowedTo('manager'), validation(valid.createUserSchema), user.createUser)
    .put(protectedRoutes, allowedTo('manager', 'staff', 'customer'), validation(valid.updateUserSchema), user.updateUser)
    .get(protectedRoutes, allowedTo('manager'), user.getAllUsers)

userRouter.get('/me', protectedRoutes, allowedTo('manager', 'staff', 'customer'), user.getUser)

userRouter.delete('/me', protectedRoutes, allowedTo('customer'), user.deleteUser)


userRouter.delete('/:id', protectedRoutes, allowedTo('manager'), validation(valid.deleteUserByIdSchema), user.deleteUser)


userRouter.patch
    ('/changePassword', protectedRoutes, allowedTo('manager', 'staff', 'customer'), validation(valid.changePasswordSchema), user.changePassword)

userRouter.patch('/changeUserRole/:id', protectedRoutes, allowedTo('manager'), validation(valid.changeUserRoleSchema), user.changeUserRole)

export default userRouter
