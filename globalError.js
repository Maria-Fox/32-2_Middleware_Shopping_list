const { message } = require("statuses");

class GlobalError extends Error {
  // to be passed into each instance of class
  constructor(message, status) {
    super();
    // we have to pull from parent class we're extending from - Error

    this.message = message;
    this.status = status;
  }
}

module.exports = GlobalError;
