

const express = require("express");
const SENDEMAIL  = require("./mails");
const app = express();
app.use(express.json())
app.use(express.urlencoded({ extended: false })); 
app.use("/email",require("./route"));

app.listen(5000, () => {
  console.log(`App is listining`);
});
