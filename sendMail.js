const nodemailer = require("nodemailer");
const siteUsers = require("./data/sitesObjects").siteUsers;
const mailConfigs = require("./data/mailConfigs");

const sendMail = (data, html, res) => {
  let smtpTransport = nodemailer.createTransport(mailConfigs[data.site]);

  let mailOptions = {
    from: data.email,
    to: siteUsers[data.site],
    subject: `Message from ${data.fname}`,
    html,
  };

  smtpTransport.sendMail(mailOptions, (error, response) => {
    if (error) {
      res.send(error);
      console.log(error);
      // logger.error(error);
    } else {
      res.send("Success");
      // logger.info("Success");
      console.log("Success");
    }
  });

  smtpTransport.close();
};

module.exports = sendMail;