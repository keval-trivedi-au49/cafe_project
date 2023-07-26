const express = require('express');
const connection = require('../dbConnection')
const { addproduct,showproducts, getByCategory, getById, updateProduct, deleteProduct } = require('../controllers/productctrl.js');
const router = express.Router();

router.post('/add', addproduct);
router.get('/showproducts', showproducts);
router.get('/getByCategory/:id', getByCategory);
router.get('/getById/:id', getById);
router.patch('/updateProduct', updateProduct);
router.delete('/delete/:id', deleteProduct);

module.exports = router;