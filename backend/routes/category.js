const express = require('express');
const connection = require('../dbConnection.js');
const {  addcategory,getcategory,updatecategory, deletecategory  } = require('../controllers/categoryctrl.js')

const router = express.Router();

router.post('/addcategory',addcategory);
router.get('/getcategory',getcategory)
router.patch('/updatecategory',updatecategory)
router.delete('/deletecategory',deletecategory)

module.exports = router;