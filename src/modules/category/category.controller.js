import { categoryModel } from "../../../databases/models/category.model.js"
import slugify from 'slugify'
import { catchAsyncError } from "../../middleware/catchAsyncError.js"
import { AppError } from "../../utils/AppError.js"
import * as factor from "../handlers/factor.handler.js"

const createCategory = catchAsyncError(async (req, res, next) => {
    req.body.slug = slugify(req.body.name)
    req.body.image = req.file.filename
    let result = new categoryModel(req.body)
    await result.save()
    res.json({ message: 'success created', result })
})

const updateCategory = catchAsyncError(async (req, res, next) => {
    const { id } = req.params
    if (req.body.name) req.body.slug = slugify(req.body.name)
    if (req.file) req.body.image = req.file.filename

    let result = await categoryModel.findByIdAndUpdate(id, req.body, { returnDocument: 'after' })
    !result && next(new AppError('category not found', 404))
    result && res.json({ message: 'success updated', result })
})

const getAllCategories = factor.getAll(categoryModel)

const getCategory = factor.getOne(categoryModel)

const deleteCategory = factor.deleteOne(categoryModel)


export {
    createCategory,
    getAllCategories,
    getCategory,
    updateCategory,
    deleteCategory
}

