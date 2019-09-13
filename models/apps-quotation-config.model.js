const mongoose = require("mongoose");

const AppsQuotationConfigSchema = require("../schemas/apps-quotation-config.schema");

const AppsQuotationConfig = (module.exports = mongoose.model(
  "apps-quotation-config",
  AppsQuotationConfigSchema
));
module.exports.get = function(callback, limit) {
  AppsQuotationConfig.find(callback).limit(limit);
};
