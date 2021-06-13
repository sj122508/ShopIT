
const Product = require('../models/product')

// Create new product => /api/v1/product/new
exports.newProduct = async (req, res, next) => {
    const product = await Product.create(req.body);

    res.status(201).json({
        success: true,
        product
    })
}

// Get all products => /api/v1/products
exports.getProducts = async (req, res, next) => {

    const products = await Product.find();

    res.status(200).json({
        success: true,
        count: products.length,
        products
    })
}

// Get single product details => /api/v1/admin/product/:id
exports.getSingleProduct = async (req, res, next) => {
    
    try {
        const product = await Product.findById(req.params.id)
        res.status(200).json({
            success: true,
            product
        })
    } catch (error) {
        res.status(404).json({
            success: false,
            message: 'Product not found - ' + error.message

        })
    }    
}

// Update Product => /api/v1/admin/product/:id
exports.updateProduct = async(req, res, next) => {
    
    try {
        const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
            useFindAndModify: false
        });

        res.status(200).json({
            success: true,
            product
        })

    } catch (error) {
         res.status(404).json({
            success: false,
            message: 'Product not found - ' + error.message

        })
    }
}

// Delete Product => /api/v1/admin/product/:id
exports.deleteProduct = async(req, res, next) => {
    try {
        const product = await Product.findById(req.params.id);

        await product.remove();

        res.status(200).json({
            success: true,
            message: 'Product is deleted.'
        })
    } catch (error) {
        res.status(404).json({
            success: false,
            message: 'Product not found - ' + error.message

        })
    }
    
} 