
import joi from 'joi'

export const createModifierSchema = joi.object({
    modifiers: joi.array().items(joi.object({
        name: joi.string().min(2).max(30).required().trim(),
        price: joi.number().min(0).required(),
        menuItem: joi.string().hex().length(24).required()
    })
    ).required()
})

export const updateModifierSchema = joi.object({
    id: joi.string().hex().length(24).required(),
    name: joi.string().min(2).max(30).trim(),
    price: joi.number().min(0),
    menuItem: joi.string().hex().length(24)
})

export const deleteModifierSchema = joi.object({
    id: joi.string().hex().length(24).required()
})
