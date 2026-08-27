const nodemailer = require("nodemailer");

const sendEmail = async (req, res) => {
  let testAccount = await nodemailer.createTestAccount();

  const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    auth: {
      user: "javonte.bosco63@ethereal.email",
      pass: "zxD2Z8bMWfW9Z6ghb4",
    },
  });

  let info = await transporter.sendMail({
    from: "COA profile <coa-portfolio@gmail.com>",
    to: "bob@example,com",
    subject: "hello",
    html: "<h2>sending emails with Node.js</h2>",
  });
  res.json(info);
};

module.exports = sendEmail;
