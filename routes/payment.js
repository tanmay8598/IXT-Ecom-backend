var request = require("request");
const express = require("express");
const router = express.Router();

var baseURL = "https://api.myfatoorah.com";
// var baseURL = "https://apitest.myfatoorah.com";

const token =
  "nm4vSqA31pV_k6Xue_2bxMZJ_0c-Q8EfFgLM-dQvxxA5KTp-Cpkboik2VFdiwxyqm3ZXvwRNWNseKXuvJbdiOJpYESyITEsUNTT-jQFNUdLjyWLK9vv8KyxOzwHHbb3elqjAH0TjBj-JqsjsBU9Dh2USO8CEhJTIpfFfH1o3Y3m8Irmj5v2SbOrMS4HG0ak65qL5pPr4B0kyrGIr3XW3tw7lBOxwcTRQztmATcBEdvsgN22eaHWxZ1m17gv4RC5KExlFkicCfxiB3T4F8c9FzkbSNThrw3lkn25W26ammCBgsa3hRh3idlZtRL1sBb1cL3N78vnArVU1EroDb7ZDRr9Zry0vtjgu-wQRLjkzUUDW7dtmx70FtQrm5sGZxZxny10c76eMY_TIZcW5c-of6T_grtKokcg5a8NDOJO1tj19zVgIFKSXC0DRzWNeYnxv3eEpQg6Inx-EEXKmr8Pc2AmrNxo0YD-YJUVWwo8A__Nx0a0HA3p6Aa2mk9KUdoVa0J8BK9xsqdgsIdzDQMfBQ25j0QBAYg85LdqZ3L2T2E0UXbrUbRq_xiwARotj9MoTZzntM5S6RyygaPfx00q6Z2qVWomvaHkczatppmRaHqcDhqJlyDpqTAHr_TuhoaC2O2OK5r_B1mCF6goHuna93eB-GWF-5kZmJ6PGt31OWzEHGbzF";
// const token = process.env.MY_FATOORAH_TOKEN;

// const token =
//   "rLtt6JWvbUHDDhsZnfpAhpYk4dxYDQkbcPTyGaKp2TYqQgG7FGZ5Th_WD53Oq8Ebz6A53njUoo1w3pjU1D4vs_ZMqFiz_j0urb_BH9Oq9VZoKFoJEDAbRZepGcQanImyYrry7Kt6MnMdgfG5jn4HngWoRdKduNNyP4kzcp3mRv7x00ahkm9LAK7ZRieg7k1PDAnBIOG3EyVSJ5kK4WLMvYr7sCwHbHcu4A5WwelxYK0GMJy37bNAarSJDFQsJ2ZvJjvMDmfWwDVFEVe_5tOomfVNt6bOg9mexbGjMrnHBnKnZR1vQbBtQieDlQepzTZMuQrSuKn-t5XZM7V6fCW7oP-uXGX-sMOajeX65JOf6XVpk29DP6ro8WTAflCDANC193yof8-f5_EYY-3hXhJj7RBXmizDpneEQDSaSz5sFk0sV5qPcARJ9zGG73vuGFyenjPPmtDtXtpx35A-BVcOSBYVIWe9kndG3nclfefjKEuZ3m4jL9Gg1h2JBvmXSMYiZtp9MR5I6pvbvylU_PP5xJFSjVTIz7IQSjcVGO41npnwIxRXNRxFOdIUHn0tjQ-7LwvEcTXyPsHXcMD8WtgBh-wxR8aKX7WPSsT1O8d8reb2aR7K3rkV3K82K_0OgawImEpwSvp9MNKynEAJQS6ZHe_J_l77652xwPNxMRTMASk1ZsJL";

router.post("/initiatePayment", async (req, res) => {
  const { totalPrice } = req.body;

  var options = {
    method: "POST",
    url: baseURL + "/v2/InitiatePayment",
    headers: {
      Accept: "application/json",
      Authorization: "Bearer " + token,
      "Content-Type": "application/json",
    },
    body: { InvoiceAmount: totalPrice, CurrencyIso: "QAR" },
    json: true,
  };

  await request(options, function (error, response, body) {
    if (error) throw new Error(error);
    res.json(body);
  });
});

router.post("/executePayment", async (req, res) => {
  const { userName, CustomerMobile, CustomerEmail, totalPrice } = req.body;

  var options = {
    method: "POST",
    url: baseURL + "/v2/ExecutePayment",
    headers: {
      Accept: "application/json",
      Authorization: "Bearer " + token,
      "Content-Type": "application/json",
    },
    body: {
      PaymentMethodId: "2",
      CustomerName: userName,
      DisplayCurrencyIso: "QAR",
      MobileCountryCode: "+974",
      CustomerMobile,
      CustomerEmail,
      InvoiceValue: totalPrice,
      CallBackUrl: "https://fiorapets.qa/success",
      ErrorUrl: "https://fiorapets.qa/error",
      Language: "en",
      //   CustomerAddress: {
      //     Block: "",
      //     Street: "",
      //     HouseBuildingNo: "",
      //     Address: "",
      //     AddressInstructions: "",
      //   },
      //   InvoiceItems: [{ ItemName: "Product 22", Quantity: 3, UnitPrice: 100 }],
    },
    json: true,
  };

  await request(options, function (error, response, body) {
    if (error) throw new Error(error);

    res.json(body);
  });
});

router.post("/getPaymentStatus", async (req, res) => {
  const { invoiceId } = req.body;
  var options = {
    method: "POST",
    url: baseURL + "/v2/getPaymentStatus",
    headers: {
      Accept: "application/json",
      Authorization: "Bearer " + token,
      "Content-Type": "application/json",
    },
    body: { Key: invoiceId, KeyType: "PaymentId" },
    json: true,
  };
  await request(options, function (error, response, body) {
    if (error) throw new Error(error);
    res.json(body);
  });
});

module.exports = router;
