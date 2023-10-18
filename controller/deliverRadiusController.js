const asyncHandler = require("express-async-handler");
const DeliveryRadius = require("../models/deliveryRadiusModel");

const updateRadiusLocation = asyncHandler(async (req, res) => {
  const { radius, location } = req.body;
  const loc = JSON.parse(location);
  console.log(loc);

  const exists = await DeliveryRadius.findOne();

  if (exists) {
    exists.radius = radius;
    exists.mylocation = loc
      ? {
          type: "Point",
          coordinates: [loc.longitude, loc.latitude],
        }
      : exists.mylocation;
    const updatedRadius = await exists.save();
    res.json(updatedRadius);
  } else {
    const deliveryradius = await DeliveryRadius.create({
      radius,
      mylocation: {
        type: "Point",
        coordinates: [loc.longitude, loc.latitude],
      },
    });
    res.json(deliveryradius);
  }
});

const checkDelivery = asyncHandler(async (req, res) => {
  const longitude = req.query.longitude;
  const latitude = req.query.latitude;

  const radius = await DeliveryRadius.findOne({});

  const delivery = await DeliveryRadius.find({
    mylocation: {
      $near: {
        $geometry: {
          type: "Point",
          coordinates: [longitude, latitude],
        },
        $maxDistance: radius.radius,
      },
    },
  });
  console.log(delivery);
  if (delivery.length > 0) {
    res.json({ message: "Delivery possible" });
  } else {
    res.json({ message: "We currently don't deliver in your area" });
  }
});
const checkRadius = asyncHandler(async (req, res) => {
  const radius = await DeliveryRadius.findOne({});

  res.json(radius);
});

module.exports = { checkDelivery, updateRadiusLocation, checkRadius };
