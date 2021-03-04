const express = require('express');
const productsRouter = express.Router();
const { requireUser } = require('./utils');
const { 
    createProduct, 
    getAllProducts,
    updateProduct,
    getProductById
    } = require('../db');

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

productsRouter.get('/:productId', async (req, res, next) => {
    const { productId } = req.params;
    try {
        const productById = await getProductById(productId);
        res.send(productById);
    } catch (error) {
        next(error);
    }
});

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

productsRouter.patch('/:productId', requireUser, async (req, res, next) => {
    const { productId } = req.params;
    const { title } = req.body;
  
    const updateFields = {};
  
    if (title) {
      updateFields.title = title;
    }
  
    try {
      const originalProduct = await getProductById(productId);
  
      if (originalProduct.authorId === req.user.id) {
        const updatedProduct = await updateProduct(productId, updateFields);
        res.send({ product: updatedProduct })
      } else {
        next({
          name: 'UnauthorizedUserError',
          message: 'You cannot update a product that is not yours'
        })
      }
    } catch ({ name, message }) {
      next({ name, message });
    }
  });

productsRouter.delete('/:productId', requireUser, async (req, res, next) => {
    try {
        const product = await getProductById(req.params.productId);

        if(product && product.authorId === req.user.id){
            const updatedProduct = await updateProduct(product.id, { active: false});
            res.send({ product: updatedProduct });
        } else {
            next( product ? {
                name: "UnauthorizedUserError",
                message: "You can not delete a product that is not yours"
            } : {
                name: "ProductNotFoundError",
                message: "That product does not exist"
            });
        }
    } catch ({name, message}) {
        next({name, message})
    }
});

module.exports = productsRouter;