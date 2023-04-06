const fast2sms = require("fast-two-sms");
const express = require("express");
const router = express.Router();

router.post("/sendotp", async (req, res) => {
  const { mobile } = req.body;

  var seq = (Math.floor(Math.random() * 10000) + 10000).toString().substring(1);

  var options = {
    authorization: process.env.FAST_2_SMS_KEY,
    message: `Please use OTP ${seq} to login/register to your Super Store account and shop from our wide range of products. OTP valid for 5 minutes`,
    numbers: [mobile],
    sender_id: "Subhash Super Store",
  };

  fast2sms
    .sendMessage(options)
    .then((response) => {
      res.send({ response, seq });
    })
    .catch((error) => res.send("Error"));
});

module.exports = router;
