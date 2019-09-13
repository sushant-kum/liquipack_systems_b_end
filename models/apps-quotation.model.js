const mongoose = require("mongoose");

const AppsQuotationSchema = require("../schemas/apps-quotation.schema");

const AppsQuotation = (module.exports = mongoose.model(
  "apps-quotation",
  AppsQuotationSchema
));
module.exports.get = function(callback, limit) {
  AppsQuotation.find(callback).limit(limit);
};
