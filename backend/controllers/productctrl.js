const connection = require("../dbConnection");

const addproduct = (req, res, next) => {
  let product = req.body;
  var query =
    "insert into product (name, categoryId, description, price, status) values(?,?,?,?,'true')";
  connection.query(
    query,
    [product.name, product.categoryId, product.description, product.price],
    (err, results) => {
      if (!err) {
        return res
          .status(200)
          .send(`product ${product.name} added successfully`);
      } else {
        return res.status(500).send(err);
      }
    }
  );
};

const showproducts = (req, res, next) => {
  var query =
    "select p.id,p.name,p.description,p.price,p.status,c.id as categoryId,c.name as categoryName from product as p INNER JOIN category as c where p.categoryId = c.id";
  connection.query(query, (err, results) => {
    if (!err) {
      return res.status(200).send(results);
    } else {
      return res.status(500).send(err);
    }
  });
};

const getByCategory = (req, res, next) => {
  const id = req.params.id;
  var query ="select id,name from product where categoryId=? and status='true'";
  connection.query(query,[id],(err, results) => {
      if (!err) {
        return res.status(200).send(results);
      } else {
        return res.status(500).send(err);
      }
    })
};

const getById = (req, res, next) => {
  const id = req.params.id;
  var query = "select id,name,description,price from product where id=?";
  connection.query(query,[id],(err, results) => {
      if (!err) {
        return res.status(200).send(results[0]);
      } else {
        return res.status(500).send(err);
      }
    });
};

const updateProduct = (req, res, next) => {
  let product = req.body;
  var query ="update product set name=?, categoryId=?,description=?,price=? where id=?";
  connection.query(
    query,
    [
      product.name,
      product.categoryId,
      product.description,
      product.price,
      product.id,
    ],
    (err, results) => {
      if (!err) {
        if (results.affectedRows == 0) {
          return res.status(404).send("Product not found");
        }
        return res.status(200).send(`Product updated successfully`);
      } else {
        return res.status(500).send(err);
      }
    }
  )
};

const deleteProduct = (req, res, next) => {
  let id = req.params.id;
  var query = "delete from product where id=?";
  connection.query(query, [id], (err, results) => {
    if (!err) {
      if (results.affectedRows == 0) {
        return res.status(404).send("Product not found");
      }
      return res.status(200).send(`Product deleted successfully`);
    } else {
      return res.status(500).send(err);
    }
  });
};

module.exports = { addproduct, showproducts, getByCategory, getById, updateProduct, deleteProduct };
