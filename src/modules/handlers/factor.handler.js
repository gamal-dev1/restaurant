import { catchAsyncError } from "../../middleware/catchAsyncError.js"
import { ApiFeatures } from "../../utils/ApiFeatures.js"
import { AppError } from "../../utils/AppError.js"

export const getAll = (model) => {
    return catchAsyncError(async (req, res, next) => {
        let apiFeatures = new ApiFeatures(model.find(), req.query)
            .paginate().filter().sort().search().fields()

        let result = await apiFeatures.mongooseQuery
        res.json({ message: 'success', page: apiFeatures.page, result })
    })
}

export const deleteOne = (model) => {
    return catchAsyncError(async (req, res, next) => {
        const { id } = req.params
        let result = await model.findByIdAndDelete(id)
        if (!result) return next(new AppError('Document not found', 404))
        res.json({ message: 'success deleted', result })
    })
}

export const getOne = (model) => {
    return catchAsyncError(async (req, res, next) => {
        const { id } = req.params
        let apiFeatures = new ApiFeatures(model.findById(id), req.query)
            .fields()
        let result = await apiFeatures.mongooseQuery

        if (!result) return next(new AppError(`${model.modelName} not found`, 404))
        res.json({ message: 'success', result })
    })
}
