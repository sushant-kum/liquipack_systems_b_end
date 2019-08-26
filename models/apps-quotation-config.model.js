let mongoose = require('mongoose');

let AppsQuotationConfigSchema = require('../schemas/apps-quotation-config.schema');

let AppsQuotationConfig = module.exports = mongoose.model('apps-quotation-config', AppsQuotationConfigSchema);
module.exports.get = function (callback, limit) {
  AppsQuotationConfig.find(callback).limit(limit);
};