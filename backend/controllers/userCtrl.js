
const connection = require("../dbConnection.js");
const jwt = require("jsonwebtoken");
const nodemailer = require('nodemailer');


const signup = (req,res,next) =>{
    let user = req.body;
    query = "select email,password,role,status from user where email=?"
    connection.query(query,[user.email],(err,result)=>{
        if(!err){
            if(result.length <= 0){
                query = "insert into user(name,contactnumber,email,password,status,role) values(?,?,?,?,'false','user')"
                connection.query(query,[user.name,user.contactnumber,user.email,user.password],(err,result)=>{
                    if(!err){
                       return res.status(200).send(`${user.name} successfully registered`)
                    }
                    else{
                        return res.status(500).send(err)
                    }
                })
            }else{
                return res.status(400).send("User already exists");
            }
        }
        else{
            return res.status(500).send(err)
        }
    })
}

const login = (req,res,next)=>{
    let user = req.body
    query = "select email,password,role,status from user where email=?"
    connection.query(query,[user.email,user.password],(err,result)=>{
        if(!err){
            // console.log(result.length<=0 || result[0].password !== user.password);
            if (result.length<=0 || result[0].password !== user.password) {
                return res.status(401).send("Incorrect user email or password");
            } else if(result[0].status == 'false') {
                return res.status(401).send("wait for Admin approval")
            }
            else if(result[0].password == user.password){
                const response = {email:result[0].email, role: result[0].role};
                const token = jwt.sign(response,process.env.SECRET_KEY,{expiresIn:'8h'})
                res.status(200).send(token)
            }
            else{
                return res.status(500).send("something went wrong");
            }
        }
        else{
            res.status(404).send(err)
        }
    })
}

const getusers = (req,res,next)=>{
    var query = "select id,name,contactnumber,status from user where role='user'"
    connection.query(query,(err,result)=>{
        if(!err){
            return res.status(200).send(result)
        }
        else{
            return res.status(500).send(err)
        }
    })
};

const  updateuser = (req,res,next)=>{
    let user = req.body;
    query = "update user set status=? where id=?";
    connection.query(query,[user.status,user.id],(err,result)=>{
        if(!err){
            if(result.affectedRows == 0){
                return res.status(404).send("User not found");
            }
            return res.status(200).send(`User updated successfully`)
        }
        else{
            res.status(500).send(err)
        }
    })
};




module.exports = {
    signup,
    login,
    getusers,
    updateuser
};