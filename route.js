const {mailToUser,CreateTemplate, sendTemplateEmail} = require("./mails");

const router = require("express").Router();


router.post("/sendEmail",mailToUser)

router.post("/createTemplate",CreateTemplate)
router.post("/sendTemplateEmail",sendTemplateEmail)
module.exports=router