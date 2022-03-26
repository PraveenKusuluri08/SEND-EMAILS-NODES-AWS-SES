const AWS = require("aws-sdk");
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

module.exports = mailToUser;
