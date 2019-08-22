let mongoose = require('mongoose');

let AppQuotationSchema = mongoose.Schema({
  quotation_num: {
    type: String,
    required: true
  },
  speed: {
    type: Number
  },
  no_of_washes: {
    type: Number
  },
  industry: {
    type: String
  },
  gmp_requirement: {
    type: Boolean
  },
  bottle_moc: {
    type: String
  },
  water_saving: {
    type: Boolean
  },
  filters_required: {
    type: Boolean
  },
  illumination_required: {
    type: Boolean
  },
  auto_level_tank: {
    type: Boolean
  },
  extra_cups_set_required: {
    type: Boolean
  },
  oteher_details: {
    type: String
  },
  customer_details: {
    type: {
      name: String,
      address: String,
      poc: {
        title: String,
        name: String,
      },
      contact_no: Number
    },
    required: true
  },
  crated_by: {
    type: String,
    required: true
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

module.exports = AppQuotationSchema;