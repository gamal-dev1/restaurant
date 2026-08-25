import mongoose from 'mongoose'

const menuItemSchema = mongoose.Schema({
    title: {
        type: String,
        unique: [true, 'title menuItem unique'],
        trim: true,
        minLength: [2, 'to short menuItem title'],
        maxLength: [500, 'to long menuItem title'],
        required: [true, 'title menuItem required']
    },
    slug: {
        type: String,
        lowercase: true,
        required: true
    },
    price: {
        type: Number,
        required: [true, 'price menuItem required'],
        default: 0
    },
    description: {
        type: String,
        minLength: [2, 'to short description menuItem'],
        maxLength: [300, 'to long description menuItem'],
        trim: true,
        required: [true, 'description menuItem required']
    },
    preparationTime: {
        type: Number,
        required: [true, 'preparationTime menuItem required'],
        min: 1
    },
    image: String,

    category: {
        type: mongoose.Types.ObjectId,
        ref: 'category',
        required: [true, 'Category menuItem required']
    },
    subcategory: {
        type: mongoose.Types.ObjectId,
        ref: 'subcategory',
        required: [true, 'Subcategory menuItem required']
    },
}, { timestamps: true })


menuItemSchema.post('init', (doc) => {
    doc.image = process.env.BASE_URL + "/menuItem/" + doc.image
})

export const menuItemModel = mongoose.model('menuItem', menuItemSchema)
