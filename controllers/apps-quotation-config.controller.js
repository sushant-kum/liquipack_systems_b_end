AppsQuotationConfig = require('../models/apps-quotation-config.model');

exports.findOne = function(query, callback) {
  AppsQuotationConfig.findOne(query, function(error, quotation_config) {
    if (error) {
      callback(error);
    } else {
      callback(null, quotation_config);
    }
  });
};

exports.index = function(callback) {
  AppsQuotationConfig.get(function(error, quotation_configs) {
    if (error) callback(error);
    else callback(null, quotation_configs);
  });
};

exports.new = function(new_quotation_config, callback) {
  const quotation_config = new AppsQuotationConfig(new_quotation_config);
  quotation_config.save(function(error) {
    if (error) {
      callback(error);
    } else {
      callback(null, quotation_config);
    }
  });
};

exports.view = function(quotation_config_id, callback) {
  AppsQuotationConfig.findById(quotation_config_id, function(error, quotation_config) {
    if (error) {
      callback(error);
    } else {
      callback(null, quotation_config);
    }
  });
};

exports.update = function(quotation_config_id, update_quotation_config, callback) {
  AppsQuotationConfig.findById(quotation_config_id, function(error, quotation_config) {
    if (error) {
      callback(error);
    } else {
      quotation_config.speed = update_quotation_config.speed;
      quotation_config.no_of_washes = update_quotation_config.no_of_washes;
      quotation_config.industry = update_quotation_config.industry;
      quotation_config.gmp_requirement = update_quotation_config.gmp_requirement;
      quotation_config.bottle_moc = update_quotation_config.bottle_moc;
      quotation_config.water_saving = update_quotation_config.water_saving;
      quotation_config.filters_required = update_quotation_config.filters_required;
      quotation_config.illumination_required = update_quotation_config.illumination_required;
      quotation_config.auto_level_tank = update_quotation_config.auto_level_tank;
      quotation_config.extra_cups_sets = update_quotation_config.extra_cups_sets;
      quotation_config.save(function(error) {
        if (error) {
          callback(error);
        } else {
          callback(null, quotation_config);
        }
      });
    }
  });
};

exports.make_active = function(quotation_config_id, callback) {
  AppsQuotationConfig.findById(quotation_config_id, function(error, quotation_config) {
    if (error) {
      callback(error);
    } else {
      AppsQuotationConfig.update(
        {
          is_active: true
        },
        {
          is_active: false
        },
        {
          multi: true
        },
        function(err, q_configs) {
          if (err) {
            callback(err);
          } else {
            quotation_config.is_active = true;
            quotation_config.save(function(error) {
              if (error) {
                callback(error);
              } else {
                callback(null, quotation_config);
              }
            });
          }
        }
      );
    }
  });
};

exports.delete = function(quotation_config_id, callback) {
  AppsQuotationConfig.deleteOne(
    {
      _id: quotation_config_id
    },
    function(error, quotation_config) {
      if (error) {
        callback(error);
      } else {
        callback(null, quotation_config);
      }
    }
  );
};
