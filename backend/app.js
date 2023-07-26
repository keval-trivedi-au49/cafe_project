const express = require('express');
const cors = require('cors');
const connection = require('./dbConnection.js')
const userRoute = require('./routes/userRoute.js');
const categoryRoute = require('./routes/category.js')
const productRoute = require('./routes/product.js');
const billRoute = require('./routes/bill.js')
const dasboardRoute = require('./routes/dasboard.js')
require('dotenv').config()

const app = express();
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cors());
app.use(userRoute);
app.use(categoryRoute);
app.use(productRoute);
app.use(billRoute)
app.use(dasboardRoute)

app.listen(process.env.PORT,()=>{
    console.log("listening on port");
})

module.exports = app;