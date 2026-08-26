import { modifierModel } from "../../../databases/models/modifier.model.js";
import { catchAsyncError } from "../../middleware/catchAsyncError.js";
import { ApiFeatures } from "../../utils/ApiFeatures.js";
import { AppError } from "../../utils/AppError.js";
import * as factor from "../handlers/factor.handler.js";

const createModifier = catchAsyncError(async (req, res, next) => {
    let result = await modifierModel.insertMany(req.body.modifiers)
    res.status(201).json({ message: 'success created', result })
})

const updateModifier = catchAsyncError(async (req, res, next) => {
    const { id } = req.params
    let result = await modifierModel.findByIdAndUpdate(id, req.body, { returnDocument: 'after' })
    if (!result) return next(new AppError('modifier not found', 404))
    res.status(200).json({ message: 'success updated', result })
})

const getAllModifiers = factor.getAll(modifierModel)

const getModifier = factor.getOne(modifierModel)

const deleteModifier = factor.deleteOne(modifierModel)

export {
    createModifier,
    getAllModifiers,
    getModifier,
    updateModifier,
    deleteModifier
}
