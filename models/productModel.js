const mongoose = require("mongoose");

const reviewSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    rating: { type: Number, required: true },
    comment: { type: String, required: true },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const productSchema = mongoose.Schema(
  {
    _id: String,
    groupId: {
      type: String,
      required: true,
    },
    hsnCode: {
      type: String,
      // required: true,
    },
    name: {
      type: String,
      required: true,
    },
    image: {
      type: Number,
      required: true,
    },
    color: {
      type: mongoose.Schema.Types.Number,
      ref: "Color",
    },
    flavour: {
      type: mongoose.Schema.Types.Number,
      ref: "Flavour",
    },

    brand: {
      type: mongoose.Schema.Types.Number,
      ref: "Brand",
    },
    category: {
      type: mongoose.Schema.Types.Number,
      required: true,
      ref: "Category",
    },
    subcategory: {
      type: mongoose.Schema.Types.Number,
      required: true,
      ref: "SubCategory",
    },
    specialcategory: {
      type: mongoose.Schema.Types.Number,
      // required: true,
      ref: "SpecialCategory",
    },
    manufacturer: {
      type: String,
    },
    size: {
      type: mongoose.Schema.Types.Number,
      ref: "Size",
    },
    weight: {
      String,
    },
    description: {
      type: String,
    },
    details: {
      type: String,
    },

    reviews: [reviewSchema],
    rating: {
      type: Number,
      required: true,
      default: 0,
    },

    cost_price: {
      type: Number,
      required: true,
      default: 0,
    },
    sell_price: {
      type: Number,
      required: true,
      default: 0,
    },
    discount: {
      type: Number,
      required: true,
      default: 0,
    },
    countInStock: {
      type: Number,
      required: true,
      default: 0,
    },
    limit: {
      type: Number,
    },
    foodType: {
      type: String,
    },
    shelflife: {
      type: String,
    },
    fssai: {
      type: String,
    },
    country: {
      type: String,
    },
    expiry: {
      type: String,
    },
    notes: {
      type: String,
    },
    customercare: {
      type: String,
    },
    units: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
