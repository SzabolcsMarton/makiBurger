const express = require("express");
const { sendEmail } = require("../helpers/emailSender");

const router = express.Router();

router.post("/email", sendEmail);

module.exports = router;
