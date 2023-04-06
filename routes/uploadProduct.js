const express = require("express");
const multer = require("multer");
const router = express.Router();
const excelToJson = require("convert-excel-to-json");
const fs = require("fs");
const Product = require("../models/productModel");
const DealerPrice = require("../models/dealerPriceModel");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./routes/uploads");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });
router.post("/", upload.single("uploadfile"), (req, res) => {
  // console.log(req.file);
  importExcelData2MongoDB(__dirname + "/uploads/" + req.file.filename);
  function importExcelData2MongoDB(filePath) {
    // -> Read Excel File to Json Data
    const excelData = excelToJson({
      sourceFile: filePath,
      header: {
        rows: 1,
      },
      columnToKey: {
        A: "_id",
        B: "hsnCode",
        C: "groupId",
        D: "name",
        E: "brand",
        F: "size",
        G: "color",
        H: "flavour",
        I: "category",
        J: "subcategory",
        K: "specialcategory",
        L: "cost_price",
        M: "sell_price",
        N: "discount",
        O: "details",
        P: "description",
        Q: "image",
        R: "weight",
        S: "countInStock",
        T: "manufacturer",
        U: "notes",
        V: "foodType",
        W: "limit",
        X: "shelflife",
        Y: "fssai",
        Z: "country",
        AA: "expiry",
        AB: "customercare",
        AC: "units",
      },
    });

    // Insert Json-Object to MongoDB
    Product.insertMany(excelData.Sheet1, (err, data) => {
      if (err) {
        console.log(err);
      } else {
        res.json("Uploaded");
      }
    });
    fs.unlinkSync(filePath);
  }
});

router.post("/dealer-price", upload.single("uploadfile"), (req, res) => {
  // console.log(req.file);
  importExcelData2MongoDB(__dirname + "/uploads/" + req.file.filename);
  function importExcelData2MongoDB(filePath) {
    // -> Read Excel File to Json Data
    const excelData = excelToJson({
      sourceFile: filePath,
      header: {
        rows: 1,
      },
      columnToKey: {
        A: "product",
        B: "min",
        C: "max",
        D: "price",
        E: "margin",
      },
    });

    // Insert Json-Object to MongoDB
    DealerPrice.insertMany(excelData.Sheet1, (err, data) => {
      if (err) {
        console.log(err);
      } else {
        res.json("Uploaded");
      }
    });
    fs.unlinkSync(filePath);
  }
});

router.post("/updateStock", upload.single("uploadfile"), (req, res) => {
  // console.log(req.file);
  importExcelData2MongoDB(__dirname + "/uploads/" + req.file.filename);
  function importExcelData2MongoDB(filePath) {
    // -> Read Excel File to Json Data
    const excelData = excelToJson({
      sourceFile: filePath,
      header: {
        rows: 1,
      },
      columnToKey: {
        A: "_id",
        B: "hsnCode",
        C: "groupId",
        D: "name",
        E: "brand",
        F: "size",
        G: "color",
        H: "flavour",
        I: "category",
        J: "subcategory",
        K: "specialcategory",
        L: "cost_price",
        M: "sell_price",
        N: "discount",
        O: "details",
        P: "description",
        Q: "image",
        R: "weight",
        S: "countInStock",
        T: "manufacturer",
        U: "notes",
        V: "foodType",
        W: "limit",
        X: "shelflife",
        Y: "fssai",
        Z: "country",
        AA: "expiry",
        AB: "customercare",
        AC: "units",
      },
    });

    excelData.Sheet1.map((item) => {
      Product.updateOne(
        { _id: item._id },
        {
          $set: {
            countInStock: item.countInStock,
            cost_price: item.cost_price,
            sell_price: item.sell_price,
            hsnCode: item.hsnCode,
            groupId: item.groupId,
            name: item.name,
            brand: item.brand,
            size: item.size,
            color: item.color,
            flavour: item.flavour,
            category: item.category,
            subcategory: item.subcategory,
            specialcategory: item.specialcategory,
            discount: item.discount,
            details: item.details,
            description: item.description,
            foodType: item.foodType,
            limit: item.limit,
            manufacturer: item.manufacturer,
            shelflife: item.shelflife,
            fssai: item.fssai,
            country: item.country,
            expiry: item.expiry,
            customercare: item.customercare,
            units: item.units,
          },
        },
        (err, data) => {
          if (err) {
            console.log(err);
          } else {
          }
        }
      );
    });

    fs.unlinkSync(filePath);
    res.json("Uploaded");
  }
});

module.exports = router;
