const { initialize_checkout } = require("../../../../../utils/iyzico");

module.exports = {
    
    async afterCreate(event) {
      const { result, params } = event;
      const response = await initialize_checkout(123456789);
    },
  };