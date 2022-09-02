const items = require("./fakeDB");
const GlobalError = require("./globalError");

class Item {
  constructor(name, price) {
    this.name = name;
    this.price = price;

    items.push({ name: name, price: price });
  }

  static findItem(name) {
    const chosen_item = items.find((item) => item.name === name);
    if (chosen_item === undefined) {
      throw { message: "No Item Found", status: 404 };
    }
    return chosen_item;
  }

  static updateItem(name, reqBody) {
    // the query string brings in the item to be udpated. The req body brings in the new name so we pass both in.
    const update_item = Item.findItem(name);
    if (update_item === undefined) {
      throw { message: "No Item Found", status: 404 };
    }

    update_item.name = reqBody.name;
    return update_item;
  }

  static deleteItem(name) {
    let itemToBeDeleted = Item.findItem(name);

    if (itemToBeDeleted === "undefined") {
      throw {
        message: "Item does not exist, it cannot be deleted.",
        status: 404,
      };
    } else {
      // you can also use .filter() since it's an array
      let item_index = items.indexOf(itemToBeDeleted);
      if (item_index) {
        items = items.splice(item_index, 1);
        return items;
      }
    }
  }
}

module.exports = Item;
// all static methods exist WITH the class, so you do not need to export them
