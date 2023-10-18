const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const Wishlist = require("../models/wishlistModel");

const addWishlistItems = asyncHandler(async (req, res) => {
  const { items, user } = req.body;

  const wishlist = await Wishlist.findOne({ user: user.id });
  let exists = false;
  if (wishlist) {
    for (i = 0; i < wishlist.items.length; i++) {
      if (wishlist.items[i].product == items[0].product) {
        exists = true;
        res.json("Product exists in the wishlist");
      }
    }
    if (exists == false) {
      const olditems = wishlist.items;
      const newitems = olditems.concat(items);

      wishlist.items = newitems;
      const updatedWishlist = await wishlist.save();
      res.json(updatedWishlist);
    }
  } else {
    const wishlist = await Wishlist.create({
      user: user.id,
      items,
    });
    res.json(wishlist);
  }
});

const deleteWishlistItems = asyncHandler(async (req, res) => {
  const { items, id } = req.query;
  const Items = JSON.parse(items);

  const wishlist = await Wishlist.findOne({ user: req.query.id });

  if (wishlist) {
    wishlist.items = wishlist.items.filter((i) => i.product !== Items.product);
    // wishlist.items = wishlist.items.filter((i) => !Items.includes(i));
    await wishlist.save();
    res.json({ message: "Item removed" });
  } else {
    res.status(404);
    throw new Error("wishlist not found");
  }
});

const getWishlist = asyncHandler(async (req, res) => {
  const items = await Wishlist.find({ user: req.query.userId }).populate(
    "items.product"
  );

  res.json(items);
});

module.exports = { deleteWishlistItems, addWishlistItems, getWishlist };
