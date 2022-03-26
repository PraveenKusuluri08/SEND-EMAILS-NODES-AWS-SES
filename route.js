const SENDEMAIL = require("./mails");

const router = require("express").Router();


router.post("/sendEmail",SENDEMAIL)
module.exports=router