require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const uploadProducts = require("./routes/uploadProduct");
const productRoutes = require("./routes/productRoutes");
const variationRoutes = require("./routes/variationRoutes");
const userRoutes = require("./routes/userRoutes");
const orderRoutes = require("./routes/orderRoutes");
const categorybannerRoutes = require("./routes/categorybannerRoutes");
const rewardRoutes = require("./routes/rewardRoutes");
const uploadImages = require("./routes/uploadImages");
const uploadSingleImage = require("./routes/uploadSingleImage");
const uploadVideo = require("./routes/uploadVideo");
const themeRoutes = require("./routes/themeRoutes");
const headingRoutes = require("./routes/headingRoutes");
const admin = require("./routes/adminRoutes");
const radius = require("./routes/deliveryRadiusRoutes");
const wishlist = require("./routes/wishlistRoutes");
const orderAgainRoutes = require("./routes/orderAgainRoutes");
const pincode = require("./routes/pincodeRoutes");
const coupen = require("./routes/coupenRoutes");

const template = require("./document/template");
const rnPushTokens = require("./routes/rnPushTokens");
const send = require("./routes/send");
const fast2smsotp = require("./routes/otpSMS");
const pdf = require("html-pdf");
const cors = require("cors");

const app = express();
const source = process.env.MONGO_URI;
app.use(
  cors({
    origin: "*",
  })
);

app.use(express.json());
app.use("/api/rnPushTokens", rnPushTokens);
app.use("/api/fast2sms", fast2smsotp);
app.use("/api/sendNoti", send);
app.use("/api/upload", uploadProducts);
app.use("/api/users", userRoutes);
// app.use("/api/delivery", delivery);
// app.use("/api/employee", employee);
app.use("/api/products", productRoutes);
app.use("/api/theme", themeRoutes);
app.use("/api/catbanner", categorybannerRoutes);
app.use("/api/heading", headingRoutes);
app.use("/api/orderAgain", orderAgainRoutes);
app.use("/api/variations", variationRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/rewards", rewardRoutes);
app.use("/api/uploadImages", uploadImages);
app.use("/api/uploadSingleImage", uploadSingleImage);
app.use("/api/uploadVideo", uploadVideo);
app.use("/api/pincode", pincode);
app.use("/api/coupen", coupen);
app.use("/api/admin", admin);
app.use("/api/radius", radius);
app.use("/api/wishlist", wishlist);

app.post("/api/create-pdf", (req, res) => {
  pdf.create(template(req.body), {}).toFile("invoice.pdf", (err) => {
    if (err) {
      res.send(Promise.reject());
    }
    res.send(Promise.resolve());
  });
});
app.get("/api/fetch-pdf", (req, res) => {
  res.sendFile(`${__dirname}/invoice.pdf`);
});
mongoose
  .connect(source)
  .then(() => console.log("DB connected"))
  .catch((err) => console.log("DB connection error", err));

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Successfully served on port: ${PORT}.`);
});
