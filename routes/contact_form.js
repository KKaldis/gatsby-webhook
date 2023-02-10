const router = require("express").Router();
const sendMail = require("../sendMail");

router.post("/", (req, res) => {
  let data = req.body;

  const html = `<h3>Contact Information</h3>
    <ul>
      <li>First Name: ${data.fname}</li>
      <li>Last Name: ${data.lname}</li>
      <li>Email: ${data.email}</li>
      <li>Phone: ${data.phone}</li>
      <li>Lead Page: ${data.page}</li>
    </ul>
    <h3>Message</h3>
    <p>${data.message}</p>
    `;
  sendMail(data, html, res);
});

module.exports = router;
