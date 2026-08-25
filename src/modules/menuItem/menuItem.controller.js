import { menuItemModel } from "../../../databases/models/menuItem.model.js";
import { catchAsyncError } from "../../middleware/catchAsyncError.js";
import slugify from 'slugify'
import { AppError } from "../../utils/AppError.js";
import * as factor from "../handlers/factor.handler.js";

const createMenuItem = catchAsyncError(async (req, res, next) => {
    req.body.image = req.file.filename
    req.body.slug = slugify(req.body.title)
    let result = await new menuItemModel(req.body)
    await result.save()
    res.status(201).json({ message: 'success created', result })
})

const updateMenuItem = catchAsyncError(async (req, res, next) => {
    const { id } = req.params
    if (req.file) req.body.image = req.file.filename
    if (req.body.title) req.body.slug = slugify(req.body.title)
    let result = await menuItemModel.findByIdAndUpdate(id, req.body, { returnDocument: 'after' })
    if (!result) return next(new AppError('menuItem not found', 404))
    res.status(200).json({ message: 'success updated', result })
})

const getAllMenuItems = factor.getAll(menuItemModel)

const getMenuItem = factor.getOne(menuItemModel)

const deleteMenuItem = factor.deleteOne(menuItemModel)


export {
    createMenuItem,
    getAllMenuItems,
    getMenuItem,
    updateMenuItem,
    deleteMenuItem
}