let mongoose = require('mongoose');

let AppQuotationConfigSchema = mongoose.Schema({
  config_name: {
    type: String,
    required: true
  },
  speed: {
    type: [Number]
  },
  no_of_washes: {
    type: [Number]
  },
  industry: {
    type: [String]
  },
  gmp_requirement: {
    type: [Boolean]
  },
  bottle_moc: {
    type: [String]
  },
  water_saving: {
    type: [Boolean]
  },
  filters_required: {
    type: [Boolean]
  },
  illumination_required: {
    type: [Boolean]
  },
  auto_level_tank: {
    type: [Boolean]
  },
  extra_cups_set_required: {
    type: [Boolean]
  },
  crated_by: {
    type: String
  },
  created_date: {
    type: Date,
    required: true,
    default: Date.now
  },
  is_active: {
    type: Boolean,
    required: true,
    default: true
  }
});

module.exports = AppQuotationConfigSchema;