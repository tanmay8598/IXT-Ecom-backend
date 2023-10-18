const asyncHandler = require("express-async-handler");
const DealerPrice = require("../models/dealerPriceModel");
const Product = require("../models/productModel");
const endOfDay = require("date-fns/endOfDay");
const startOfDay = require("date-fns/startOfDay");
const { parseISO } = require("date-fns");
const Order = require("../models/orderModel.js");

const createProduct = asyncHandler(async (req, res) => {
  const {
    name,
    sku,
    groupId,
    image,
    color,
    flavour,
    brand,
    subBrand,
    category,
    subcategory,
    specialcategory,
    manufacturer,
    size,
    weight,
    description,
    details,
    cost_price,
    sell_price,
    discount,
    countInStock,
    limit,
    notes,
    hsnCode,
    foodType,
    shelflife,
    fssai,
    country,
    expiry,
    customercare,
    units,
  } = req.body;
  const product = await Product.create({
    _id: sku,
    name,
    groupId,
    image,
    color,
    subBrand,
    flavour,
    brand,
    category,
    subcategory,
    specialcategory,
    manufacturer,
    size,
    weight,
    description,
    details,
    cost_price,
    sell_price,
    discount,
    countInStock,
    limit,
    notes,
    hsnCode,
    foodType,
    shelflife,
    fssai,
    country,
    expiry,
    customercare,
    units,
  });

  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
});

const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.query.id);

  if (product) {
    await product.remove();
    res.json({ message: "Product removed" });
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

const getProducts = asyncHandler(async (req, res) => {
  const {
    category,
    subcategory,
    specialcategory,
    size,
    color,
    brand,
    subBrand,
    price,
    ratings,
    min,
    max,
    mindiscount,
  } = req.query;

  const minprice = min ? min : 0;
  const maxprice = max ? max : 25000;

  if (minprice || maxprice) {
    const filter = {
      category,
      subcategory,
      specialcategory,
      size,
      color,
      brand,
      subBrand,
      minprice,
      maxprice,
      rating: ratings,
    };

    const asArray = Object.entries(filter);

    const filtered = asArray.filter(([key, value]) => value);

    const justStrings = Object.fromEntries(filtered);
    // console.log(justStrings);
    const pageSize = 20;
    const page = Number(req.query.pageNumber) || 1;

    const count = await Product.countDocuments({
      $and: [
        justStrings,
        { sell_price: { $gte: minprice } },
        { sell_price: { $lte: maxprice } },
        { discount: { $gte: mindiscount ? mindiscount : 0 } },
      ],
    });
    var pageCount = Math.floor(count / 20);
    if (count % 20 !== 0) {
      pageCount = pageCount + 1;
    }

    const products = await Product.find({
      $and: [
        justStrings,
        { sell_price: { $gte: minprice } },
        { sell_price: { $lte: maxprice } },
        { discount: { $gte: mindiscount ? mindiscount : 0 } },
      ],
    })
      .limit(pageSize)
      .sort({ createdAt: -1 })
      .skip(pageSize * (page - 1))
      .populate(
        "size flavour brand category subcategory specialcategory color limit subBrand"
      );

    res.json({ products, pageCount });
  } else {
    const filter = {
      category,
      subcategory,
      specialcategory,
      size,
      color,
      brand,
      subBrand,
      price,
      rating: ratings,
    };

    const asArray = Object.entries(filter);

    const filtered = asArray.filter(([key, value]) => value);

    const justStrings = Object.fromEntries(filtered);

    const pageSize = 10;
    const page = Number(req.query.pageNumber) || 1;

    const count = await Product.countDocuments(justStrings);
    var pageCount = Math.floor(count / 10);
    if (count % 10 !== 0) {
      pageCount = pageCount + 1;
    }

    const products = await Product.find(justStrings)
      .limit(pageSize)
      .sort({ createdAt: -1 })
      .skip(pageSize * (page - 1))
      .populate(
        "size flavour brand category subcategory specialcategory color limit subBrand"
      );

    res.json({ products, pageCount });
  }
});

const getProductsByCategory = asyncHandler(async (req, res) => {
  const pageSize = 30;
  const page = Number(req.query.pageNumber) || 1;
  const count = await Product.countDocuments({ category: req.query.catId });
  var pageCount = Math.floor(count / 10);
  if (count % 10 !== 0) {
    pageCount = pageCount + 1;
  }
  const products = await Product.find({ category: req.query.catId })
    .limit(pageSize)
    .skip(pageSize * (page - 1))
    .populate(
      "size flavour brand category subcategory specialcategory color subBrand"
    );
  res.json({ products, pageCount });
});

const getProductsBySubCategory = asyncHandler(async (req, res) => {
  const pageSize = 30;
  const page = Number(req.query.pageNumber) || 1;
  const count = await Product.countDocuments({ category: req.query.SubCatId });
  var pageCount = Math.floor(count / 10);
  if (count % 10 !== 0) {
    pageCount = pageCount + 1;
  }
  const products = await Product.find({
    subcategory: req.query.SubCatId,
  })
    .limit(pageSize)
    .skip(pageSize * (page - 1))
    .populate(
      "size flavour brand category subcategory specialcategory color subBrand"
    );
  res.json({ products, pageCount });
});

const getProductsBySpecialCategory = asyncHandler(async (req, res) => {
  const pageSize = 30;
  const page = Number(req.query.pageNumber) || 1;
  const count = await Product.countDocuments({
    specialcategory: req.query.SpecialCatId,
  });
  var pageCount = Math.floor(count / 10);
  if (count % 10 !== 0) {
    pageCount = pageCount + 1;
  }
  const products = await Product.find({
    specialcategory: req.query.SpecialCatId,
  })
    .limit(pageSize)
    .skip(pageSize * (page - 1))
    .populate(
      "size flavour brand category subcategory specialcategory color subBrand"
    );
  // console.log(products);
  res.json({ products, pageCount });
});

const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.query.productId).populate(
    "color flavour brand category subcategory specialcategory size subBrand"
  );
  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

const getProductByGroupId = asyncHandler(async (req, res) => {
  const products = await Product.find({ groupId: req.query.groupId }).populate(
    "color flavour brand category subcategory specialcategory size subBrand"
  );
  // console.log(products);
  if (products) {
    res.json(products);
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

const createProductReview = asyncHandler(async (req, res) => {
  const { rating, comment, user, productId } = req.body;

  const product = await Product.findById(productId);

  if (product) {
    const alreadyReviewed = product.reviews.find(
      (r) => r.user.toString() === user.id.toString()
    );

    if (alreadyReviewed) {
      res.status(400);
      throw new Error("Product already reviewed");
    }

    const review = {
      name: user.name,
      rating: Number(rating),
      comment,
      user: user.id,
    };

    product.reviews.push(review);

    product.rating =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) /
      product.reviews.length;

    await product.save();
    res.status(201).json({ message: "Review added" });
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

const createSaleByCategory = asyncHandler(async (req, res) => {
  const { salePercent, category } = req.body; // in percent
  const products = await Product.updateMany(
    { category: category },
    { discount: salePercent }
  );
  res.json(products);
});

const createSaleBySubCategory = asyncHandler(async (req, res) => {
  const { salePercent, subcategory } = req.body; // in percent
  const products = await Product.updateMany(
    { subcategory: subcategory },
    { discount: salePercent }
  );
  res.json(products);
});

const createSaleBySpecialCategory = asyncHandler(async (req, res) => {
  const { salePercent, specialcategory } = req.body; // in percent
  const products = await Product.updateMany(
    { specialcategory: specialcategory },
    { discount: salePercent }
  );
  res.json(products);
});

const createSaleByProduct = asyncHandler(async (req, res) => {
  const { salePercent, sku } = req.body; // need to check how to send
  const product = await Product.updateOne(
    { _id: sku },
    { discount: salePercent }
  );

  res.json(product);
});

const updateProduct = asyncHandler(async (req, res) => {
  const {
    name,
    sku,
    groupId,
    image,
    color,
    flavour,
    brand,
    category,
    subcategory,
    specialcategory,
    manufacturer,
    size,
    subBrand,
    weight,
    description,
    details,
    cost_price,
    sell_price,
    discount,
    countInStock,
    limit,
    notes,
    shelflife,
    fssai,
    country,
    expiry,
    hsnCode,
    customercare,
    units,
  } = req.body;

  const product = await Product.findById(sku);

  if (product) {
    product.name = name;
    product.groupId = groupId;
    product.description = description;
    product.image = image;
    product.brand = brand;
    product.subBrand = subBrand;
    product.category = category;
    product.subcategory = subcategory;
    product.specialcategory = specialcategory;
    product.color = color;
    product.flavour = flavour;
    product.manufacturer = manufacturer;
    product.size = size;
    product.weight = weight;
    product.details = details;
    product.cost_price = cost_price;
    product.sell_price = sell_price;
    product.discount = discount;
    product.notes = notes;
    product.countInStock = countInStock;
    product.shelflife = shelflife;
    product.limit = limit;
    product.fssai = fssai;
    product.expiry = expiry;
    product.country = country;
    product.hsnCode = hsnCode;
    product.customercare = customercare;
    product.units = units;

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

const searchProducts = asyncHandler(async (req, res) => {
  const products = await Product.aggregate([
    {
      $search: {
        index: "default",
        text: {
          query: req.query.Query,
          path: ["name", "details", "description"],
        },
      },
    },
  ]);

  if (products) {
    res.json(products);
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

const outOfStockProduct = asyncHandler(async (req, res) => {
  const pageSize = 30;
  const page = Number(req.query.pageNumber) || 1;
  const count = await Product.countDocuments({ countInStock: { $lte: 0 } });
  var pageCount = Math.floor(count / 10);
  if (count % 10 !== 0) {
    pageCount = pageCount + 1;
  }
  const products = await Product.find({
    countInStock: { $lte: 0 },
  })
    .limit(pageSize)
    .skip(pageSize * (page - 1))
    .populate(
      "size flavour brand category subcategory specialcategory color subBrand"
    );
  res.json({ products, pageCount });
});

const getBestSellingProducts = asyncHandler(async (req, res) => {
  const pageSize = 20;
  const page = Number(req.query.pageNumber) || 1;
  const count = await Product.countDocuments();
  var pageCount = Math.floor(count / 10);
  if (count % 10 !== 0) {
    pageCount = pageCount + 1;
  }
  const products = await Product.find({})
    .sort({ rating: -1 })
    .limit(pageSize)
    .skip(pageSize * (page - 1))
    .populate(
      "size flavour brand category subcategory specialcategory color subBrand"
    );

  res.json({ products, pageCount });
});

const getSaleProducts = asyncHandler(async (req, res) => {
  const pageSize = 20;
  const page = Number(req.query.pageNumber) || 1;
  const count = await Product.countDocuments({ discount: { $gte: 1 } });
  var pageCount = Math.floor(count / 10);
  if (count % 10 !== 0) {
    pageCount = pageCount + 1;
  }
  const products = await Product.find({ discount: { $gte: 1 } })
    .sort({ discount: -1 })
    .limit(pageSize)
    .skip(pageSize * (page - 1))
    .populate(
      "size flavour brand category subcategory specialcategory color subBrand"
    );
  res.json({ products, pageCount });
});

const getRecentReviews = asyncHandler(async (req, res) => {
  const pageSize = 20;
  const page = Number(req.query.pageNumber) || 1;
  const count = await Product.countDocuments({
    reviews: { $exists: true, $ne: [] },
  });
  var pageCount = Math.floor(count / 10);
  if (count % 10 !== 0) {
    pageCount = pageCount + 1;
  }
  const product = await Product.find(
    { reviews: { $exists: true, $ne: [] } },
    { name: 1, reviews: 1, rating: 1 }
  )
    .sort({ "reviews.createdAt": -1 })
    .limit(pageSize)
    .skip(pageSize * (page - 1));

  res.json({ product, pageCount });
});
const deleteReviews = asyncHandler(async (req, res) => {
  const product = await Product.findOneAndUpdate(
    { _id: req.body.id },
    { $pull: { reviews: { _id: req.body.reviewId } } }
  );
  // product.rating =
  //     product.reviews.reduce((acc, item) => item.rating + acc, 0) /
  //     product.reviews.length;

  //   await product.save();
});

const createDealerPrice = asyncHandler(async (req, res) => {
  const { min, max, price, product, margin } = req.body;

  const dealerPrice = await DealerPrice.create({
    min,
    max,
    price,
    product,
    margin,
  });
  res.json(dealerPrice);
});

const updateDealerPrice = asyncHandler(async (req, res) => {
  const { min, max, price, product, margin, dealerPriceId } = req.body;

  const dealerPrice = await DealerPrice.findById(dealerPriceId);

  if (dealerPrice) {
    dealerPrice.min = min;
    dealerPrice.max = max;
    dealerPrice.price = price;
    dealerPrice.margin = margin;

    const updatedPrice = await dealerPrice.save();
    res.json(updatedPrice);
  } else {
    res.status(404);
    throw new Error("DealerPrice not found");
  }
});

const deleteDealerPrice = asyncHandler(async (req, res) => {
  const dealerPrice = await DealerPrice.findById(req.query.id);

  if (dealerPrice) {
    await dealerPrice.remove();
    res.json({ message: "dealerPrice removed" });
  } else {
    res.status(404);
    throw new Error("dealerPrice not found");
  }
});

const getDealerPricesByProductId = asyncHandler(async (req, res) => {
  const prices = await DealerPrice.find({ product: req.query.productId });
  if (prices) {
    res.json(prices);
  } else {
    res.status(404);
    throw new Error("dealerPrice not found");
  }
});

const downloadProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({});

  res.json(products);
});

const getTotalProducts = asyncHandler(async (req, res) => {
  const countOutOfStock = await Product.countDocuments({
    countInStock: { $lte: 0 },
  });
  const countProduct = await Product.countDocuments();

  res.json({ countOutOfStock, countProduct });
});

const getTopSellingProducts = asyncHandler(async (req, res) => {
  const { startDate, endDate } = req.query;

  const s1 = startOfDay(parseISO(startDate));
  const s2 = endOfDay(parseISO(endDate));

  const unwind = {
    $unwind: "$orderItems",
  };
  const sort = {
    $sort: {
      sum: -1,
    },
  };
  const limit = {
    $limit: 20,
  };

  const match_stage = {
    $match: {
      createdAt: { $gte: s1, $lte: s2 },
    },
  };

  const group_stage = {
    $group: {
      _id: "$orderItems.product",
      sum: {
        $sum: "$orderItems.qty",
      },
    },
  };
  const group_stage2 = {
    $group: {
      _id: null,
      top_selling_products: {
        $push: { _id: "$_id", sum: "$sum" },
      },
    },
  };
  const pipeline = [
    match_stage,
    unwind,
    group_stage,
    sort,
    limit,
    group_stage2,
  ];

  const topSelling = await Order.aggregate(pipeline);

  if (topSelling.length !== 0) {
    const bestproducts = await Product.find({
      _id: { $in: topSelling[0].top_selling_products },
    }).select("_id name");
    const products = topSelling[0].top_selling_products.map((item, index) => {
      for (i = 0; i < bestproducts.length; i++) {
        if (bestproducts[i]._id == item._id) {
          return {
            _id: item._id,
            name: bestproducts[i].name,
            sum: item.sum,
          };
        }
      }
    });
    res.json(products);
  }
});

module.exports = {
  outOfStockProduct,
  getRecentReviews,
  deleteReviews,
  createProduct,
  deleteProduct,
  updateProduct,
  getProducts,
  getProductById,
  getProductByGroupId,
  createProductReview,
  getProductsByCategory,
  getProductsBySubCategory,
  getProductsBySpecialCategory,
  createSaleByCategory,
  createSaleByProduct,
  createSaleBySpecialCategory,
  createSaleBySubCategory,
  searchProducts,
  getBestSellingProducts,
  getSaleProducts,
  createDealerPrice,
  updateDealerPrice,
  deleteDealerPrice,
  getDealerPricesByProductId,
  downloadProducts,
  getTotalProducts,
  getTopSellingProducts,
};
