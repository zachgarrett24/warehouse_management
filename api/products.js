const express = require('express');
const productsRouter = express.Router();
const { createProduct, getAllProducts } = require('../db');
const { requireUser } = require('./utils');

productsRouter.get('/', async (req, res, next) => {
    try {
        const allProducts = await getAllProducts();

        const products = allProducts.filter(product => {
            if(product.active) {
                return true;
            }
            if(req.user && product.authorId === req.user.id){
                return true;
            }
            return false;
        });
    
        res.send({ products });
    } catch ({name, message}) {
            next({name, message})
    }
});

// productsRouter.post('/', requireUser, async (req, res, next) => {
//     res.send({ message: 'Under Construction' });
// });

productsRouter.post('/', requireUser, async (req, res, next) => {
    const {title} = req.body;

    const productData = {};

    try {
        productData.authorId = req.user.id;
        productData.title = title;
        const product = await createProduct(productData);

        if(product){
            res.send({product})
        } else {
            next({
                name: "ProductCreationError",
                message: "There was an error creating your product. Please try again"
            });
        }
    } catch ({name, message}) {
        next({name, message})
    }
})

module.exports = productsRouter;