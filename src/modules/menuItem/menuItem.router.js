import express from "express"
import *as  menuItem from "./menuItem.controller.js"
import { uploadSingleFile } from "../../middleware/fileUpload.js"
import { allowedTo, protectedRoutes } from "../Auth/auth.controller.js"
import { validation } from "../../middleware/validation.js"
import { createMenuItemSchema, DeleteMenuItemSchema, updateMenuItemSchema } from "./menuItem.validation.js"

const menuItemRouter = express.Router()

menuItemRouter.route('/')
    .post(uploadSingleFile('image', 'menuItem'), protectedRoutes, allowedTo('manager', 'staff'),validation(createMenuItemSchema), menuItem.createMenuItem)
    .get(menuItem.getAllMenuItems)


menuItemRouter.route('/:id')
    .get(menuItem.getMenuItem)
    .put(uploadSingleFile('image', 'menuItem'), protectedRoutes, allowedTo('manager', 'staff'),validation(updateMenuItemSchema), menuItem.updateMenuItem)
    .delete(protectedRoutes, allowedTo('manager', 'staff'),validation(DeleteMenuItemSchema), menuItem.deleteMenuItem)


export default menuItemRouter
