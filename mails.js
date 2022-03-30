const AWS = require("aws-sdk");
const template = require("./template");
require("dotenv").config();

AWS.config.update({
  accessKeyId: process.env.ACCESS_KEY_ID,
  secretAccessKey: process.env.SECRET_ACCESS_KEY,
  region: process.env.REGION,
});

const ses = new AWS.SES({ apiVersion: "2010-12-01" });
function mailToUser(req, res) {
  const { subject, to, body } = req.body;
  const params = {
    Destination: {
      ToAddresses: ["praveenkusuluri08@gmail.com"],
    },
    ConfigurationSetName: "ecom-emails",
    Message: {
      Body: {
        Html: {
          Charset: "UTF-8",
          Data: `<html>
                  <body>
                  <h1>${body}</h1>
                  <p>Time=${new Date().toISOString()}</p>
                  </body>
                  </html>`,
        },
        Text: {
          Charset: "UTF-8",
          Data: "Hello world of aws",
        },
      },
      Subject: {
        Charset: "UTF-8",
        Data: subject,
      },
    },
    Source: "webapp.ecom@gmail.com",
  };
  const sendEmail = ses.sendEmail(params).promise();
  sendEmail
    .then((data) => {
      console.log(data);
      return res.status(200).json(data);
    })
    .catch((err) => {
      console.log(err);
      return res.status(400).json({ error: err });
    });
}

async function CreateTemplate(req, res) {
  var params = {
    Template: {
      TemplateName: "WELCOME_EMAIL",
      HtmlPart: `<div>
      <div style="display=flex;justify-content:center">
      <h3>Hello,<strong>{{name}}</strong> Welcome to a board</h3>
      <br/>
      <p>Your email address {{email}} kindly you will recieve all updates to this account</p>
      <p>We hope everything is fine. Thank you for signing up,we will always be with you</p>
      
      </div>
      <div style="display:grid;align-items:bottom">
      <p>Regards,</p>
      <p>Team ECOM</p>
      </div>
      </div>`,
      SubjectPart: "Welcome to a board",
      TextPart:
        "Hello ${name}},\r\n Your email address {{email}} kindly you will recieve all updates to this account",
    },
  };
  const sendEmail = ses.createTemplate(params).promise();
  sendEmail
    .then((data) => {
      console.log(data);
      return res.status(200).json(data);
    })
    .catch((err) => {
      console.log(err);
      return res.status(400).json(err);
    });
}

function sendTemplateEmail(req, res) {
  const templateData = JSON.stringify({
    name: req.body.name,
    email: req.body.email,
  });
  const params = {
    Source: "webapp.ecom@gmail.com",
    Template: "WELCOME_EMAIL",
    ConfigurationSetName: "ecom-emails",
    Destination: {
      ToAddresses: [req.body.email],
    },
    TemplateData: templateData,
  };
  const sendEmail = ses.sendTemplatedEmail(params).promise();
  sendEmail
    .then((data) => {
      console.log(data);
      return res.status(200).json({ data: data });
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).json({ err: err });
    });
}

module.exports = { mailToUser, CreateTemplate, sendTemplateEmail };
