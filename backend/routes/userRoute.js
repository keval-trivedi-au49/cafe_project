const express = require("express");
const { signup, login, getusers, updateuser } = require("../controllers/userCtrl.js");
const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/getusers", getusers);
router.patch("/updateuser", updateuser);

module.exports = router;
