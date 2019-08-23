AppsQuotation = require('../models/apps-quotation.model');

exports.findOne = function (query, callback) {
  AppsQuotation.findOne(query, function (error, quotation) {
    if (error) {
      callback(error);
    }
    else {
      callback(null, quotation);
    }
  })
};

exports.index = function (callback) {
  AppsQuotation.get(function (error, quotations) {
    if (error)
      callback(error);
    else
      callback(null, quotations);
  });
};

exports.new = function (new_quotation, callback) {
  let quotation = new AppsQuotation(new_quotation);
  quotation.save(function (error) {
    if (error) {
      callback(error);
    }
    else {
      callback(null, quotation);
    }
  });
};

exports.view = function (quotation_id, callback) {
  AppsQuotation.findById(quotation_id, function (error, quotation) {
    if (error) {
      callback(error);
    }
    else {
      callback(null, quotation);
    }
  });
};

exports.update = function (quotation_id, update_quotation, callback) {
  AppsQuotation.findById(quotation_id, function (error, quotation) {
    if (error) {
      callback(error);
    }
    else {
      quotation.speed = update_quotation.speed;
      quotation.no_of_washes = update_quotation.no_of_washes;
      quotation.industry = update_quotation.industry;
      quotation.gmp_requirement = update_quotation.gmp_requirement;
      quotation.bottle_moc = update_quotation.bottle_moc;
      quotation.water_saving = update_quotation.water_saving;
      quotation.filters_required = update_quotation.filters_required;
      quotation.illumination_required = update_quotation.illumination_required;
      quotation.auto_level_tank = update_quotation.auto_level_tank;
      quotation.extra_cups_sets = update_quotation.extra_cups_sets;
      quotation.other_details = update_quotation.other_details;
      quotation.customer_details = update_quotation.customer_details;
      quotation.save(function (error) {
        if (error) {
          callback(error);
        }
        else {
          callback(null, quotation);
        }
      });
    }
  });
};

exports.make_inactive = function (quotation_id, callback) {
  AppsQuotation.findById(quotation_id, function (error, quotation) {
    if (error) {
      callback(error);
    }
    else {
      quotation.is_active = false;
      quotation.save(function (error) {
        if (error) {
          callback(error);
        }
        else {
          callback(null, quotation);
        }
      });
    }
  });
};

exports.make_active = function (quotation_id, callback) {
  AppsQuotation.findById(quotation_id, function (error, quotation) {
    if (error) {
      callback(error);
    }
    else {
      quotation.is_active = true;
      quotation.save(function (error) {
        if (error) {
          callback(error);
        }
        else {
          callback(null, quotation);
        }
      });
    }
  });
};

exports.delete = function (quotation_id, callback) {
  AppsQuotation.deleteOne({
    _id: quotation_id
  }, function (error, quotation) {
    if (error) {
      callback(error);
    }
    else {
      callback(null, quotation);
    }
  });
};