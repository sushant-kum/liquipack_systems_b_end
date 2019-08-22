let mongoose = require('mongoose');

let AppsQuotationSchema = require('../schemas/apps-quotation.schema');

let AppsQuotation = module.exports = mongoose.model('apps-quotation', AppsQuotationSchema);
module.exports.get = function (callback, limit) {
  AppsQuotation.find(callback).limit(limit);
};