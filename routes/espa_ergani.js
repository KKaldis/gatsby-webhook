const sendMail = require("../sendMail");
const router = require("express").Router();

router.post("/", (req, res) => {
    let data = JSON.parse(req.body);

    const html = `<h3>Contact Information</h3>
    <ul>
      <li>First Name: ${data.fname}</li>
      <li>Last Name: ${data.lname}</li>
      <li>Email: ${data.email}</li>
      <li>Phone: ${data.phone}</li>
      <li>Lead Page: ${data.page}</li>
      <li>Number of Workers: ${data.workers}</li>
      <li>Current Software: ${data.software}</li>
      <li>Accounting Type: ${data.accounterType}</li>
    </ul>
    <h3>Message</h3>
    <p>${data.message}</p>
    <ul>
      <li>ΕΣΠΑ Newsletter: ${data.espa} </li>
      <li>Promo Newsletter: ${data.newsletter} </li>
    </ul>
`;
    sendMail(data, html, res);
});
module.exports = router;
