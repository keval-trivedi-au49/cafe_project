const express = require('express');
const router = express.Router();
const connection = require('../dbConnection')
let ejs = require('ejs');
let pdf = require('html-pdf');
let path = require('path');
var fs = require('fs');
var uuid = require('uuid');


router.post('/generateReport',(req,res,next)=>{
    const generateUuid = uuid.v1();
    const orderDetails = req.body;
    var productDetailsReport = JSON.parse(orderDetails.productdetails);

    var query = "insert into bill (name,uuid,email,contactnumber,paymentmethod,total,productdetails) values(?,?,?,?,?,?,?)";
    connection.query(query,[orderDetails.name,generateUuid,orderDetails.email,orderDetails.contactnumber, orderDetails.paymentmethod,orderDetails.totalAmount,orderDetails.productDetailsReport,res.locals.email],(err,results)=>{
        if (!err) {
            ejs.renderFile(path.join(__dirname,"../report.ejs"),{productDetails:productDetailsReport,name:orderDetails.name,email:orderDetails.email,contactnumber:orderDetails.contactnumber,paymentmethod:orderDetails.paymentmethod,totalAmount:orderDetails.totalAmount},(err,results)=>{
                if(err){
                    // console.log(err);
                    return res.status(500).send(err);
                }
                else{
                    pdf.create(results).toFile("./generated_pdf/"+generateUuid+".pdf",function(err,data){
                        if(err){
                            console.log(err);
                            return res.status(500).send(err);
                        }else{
                            return res.status(200).send({uuid:generateUuid});
                        }
                    })
                }
            })
        } else {
            return res.status(500).send(err)
        }
    })
});

router.get('/getBills',(req,res,next)=>{
    var query = "select * from bill order by id DESC";
    connection.query(query,(err,results)=>{
        if(!err){
            return res.status(200).send(results);
        }
        else{
            return res.status(500).send(err)
        }
    })
})

router.delete('/deleteBill/:id',(req,res,next)=>{
    var query = "delete from bill where id=?";
    connection.query(query,[req.params.id],(err,result)=>{
        if(!err){
            if(result.affectedRows == 0){
                return res.status(404).send("Bill not found");
            }
            return res.status(200).send(`Bill deleted successfully`)
        }
        else{
            res.status(500).send(err)
        }
    })
})

module.exports = router;