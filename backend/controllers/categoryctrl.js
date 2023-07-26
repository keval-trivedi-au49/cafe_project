const connection = require("../dbConnection.js");

const addcategory = (req, res, next) => {
  let category = req.body;
  query = "insert into category (name) values(?)";
  connection.query(query, [category.name], (err, result) => {
    if (!err) {
      return res.status(200).send(`${category.name} successfully added`);
    } else {
      return res.status(500).send(err);
    }
  });
};

const getcategory = (req, res) => {
    query = "select * from category"
    connection.query(query, (err, result) => {
      if (!err) {
        return res.status(200).send(result);
      } else {
        return res.status(500).send(err);
      }
    })
};

const updatecategory = (req,res)=>{
    let category = req.body;
    query = "update category set name=? where id=?";
    connection.query(query,[category.name,category.id],(err,result)=>{
        if(!err){
            if(result.affectedRows == 0){
                return res.status(404).send("Category not found");
            }
            return res.status(200).send(`Category updated successfully`)
        }
        else{
            res.status(500).send(err)
        }
    })
};

const deletecategory = (req,res,next) => {
    let category = req.body;
    query = "delete from category where id=?";
    connection.query(query,[category.id],(err,result)=>{
        if(!err){
            if(result.affectedRows == 0){
                return res.status(404).send("Category not found");
            }
            return res.status(200).send(`Category deleted successfully`)
        }
        else{
            res.status(500).send(err)
        }
    })
};

module.exports = { addcategory, getcategory, updatecategory, deletecategory };
