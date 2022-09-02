const { Router } = require("express");
const express = require("express");
let items = require("./fakeDB");
const GlobalError = require("./globalError");
const { findItem, modifyItem, update } = require("./itemClass");
let Item = require("./itemClass");
const router = new express.Router();

router.get("/all", function (req, res, next) {
  try {
    if (!res) return next();
    else {
      return res.json({ items: items });
    }
  } catch (err) {
    return next(err);
  }
});

router.post("/add", function (req, res, next) {
  try {
    if (!req.body.name) {
      throw new GlobalError("Please include a name to log your item", 400);
    }

    let name = req.body.name;
    let price = req.body.price;
    console.log(name, price);

    let newItem = new Item(name, price);

    return res.status(201).json({ added: newItem });
  } catch (err) {
    console.log(err);
    next(err);
  }
});

router.get("/:name", function (req, res, next) {
  try {
    // array method used to find the 1st value in array meeting reqs
    let search_item = req.params.name;
    console.log(search_item);

    let found_item = findItem(search_item);
    console.log(found_item);
    return res.status(200).json({ item: found_item });
  } catch (err) {
    next(err);
  }
});

// alternative solution
// router.get("/:name", function (req, res) {
//   const queryItem = items.find((item) => item.name === req.params.name);
//   if (queryItem === undefined) {
//     throw new GlobalError("Item not found", 404);
//   }
//   return res.status(200).json(queryItem);
// });

router.patch("/:name", function (req, res, next) {
  // update item that matches given name //
  try {
    // using class.method
    const query_item = Item.updateItem(req.params.name, req.body);
    return res.json({ updated: query_item });
  } catch (err) {
    return next(err);
  }
});

router.delete("/:name", function (req, res, next) {
  try {
    let item_name = req.params.name;
    let deleted_item = Item.deleteItem(item_name);

    return res.json({ message: "Deleted" });
  } catch (err) {
    next(err);
  }
});

// we only export the router variable.
module.exports = router;
