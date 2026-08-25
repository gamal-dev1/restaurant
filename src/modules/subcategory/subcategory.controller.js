import { subcategoryModel } from "../../../databases/models/subcategory.model.js";
import { catchAsyncError } from "../../middleware/catchAsyncError.js";
import slugify from 'slugify'
import { AppError } from "../../utils/AppError.js";
import * as factor from "../handlers/factor.handler.js";


const createSubCategory = catchAsyncError(async (req, res, next) => {
    req.body.slug = slugify(req.body.name)
    req.body.image = req.file.filename
    let result = await new subcategoryModel(req.body)
    await result.save()
    res.json({ message: 'success created', result })
})

const getAllSubCategories = catchAsyncError(async (req, res, next) => {
    let filter = {}
    if (req.params.categoryId)
        filter = { category: req.params.categoryId }

    let result = await subcategoryModel.find(filter)
    res.json({ message: 'success', result })
})

const updateSubCategory = catchAsyncError(async (req, res, next) => {
    const { id } = req.params
    if (req.body.name) req.body.slug = slugify(req.body.name)
    if (req.file) req.body.image = req.file.filename
    let result = await subcategoryModel.findByIdAndUpdate(id, req.body, { returnDocument: 'after' })

    if (!result) return next(new AppError('subCategory not found', 404))
    res.json({ message: 'success update', result })
})


const getSubCategory = factor.getOne(subcategoryModel)

const deleteSubCtegory = factor.deleteOne(subcategoryModel)


export {
    createSubCategory,
    getAllSubCategories,
    getSubCategory,
    updateSubCategory,
    deleteSubCtegory
}