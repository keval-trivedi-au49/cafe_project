const connection = require('../dbConnection');

const getdetails = (req,res,next)=> {
    var categoryCount;
    var producCount;
    var billCount;
    var query = "select count(id) as categoryCount from category";
    connection.query(query,(err,result)=>{
        if(!err){
            categoryCount = result[0].categoryCount;
        }
        else{
            return res.status(500).send(err)
        }
    })

    query = "select count(id) as productCount from product";
    connection.query(query,(err,result)=>{
        if(!err){
            producCount = result[0].productCount;
        }
        else{
            return res.status(500).send(err)
        }
    })

    query = "select count(id) as billCount from bill";
    connection.query(query,(err,result)=>{
        if(!err){
            billCount = result[0].billCount;
            var data = {
                category:categoryCount,
                product:producCount,
                bill:billCount
            }
            return res.status(200).send(data)
        }
        else{
            return res.status(500).send(err)
        }
    })
}

module.exports = getdetails;