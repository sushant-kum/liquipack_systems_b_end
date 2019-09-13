const mongoose = require("mongoose");

const AppQuotationSchema = mongoose.Schema({
  quotation_num: {
    type: String,
    required: true,
    unique: true
  },
  speed: {
    type: {
      qty: Number,
      price: Number
    },
    required: true
  },
  no_of_washes: {
    type: {
      qty: Number,
      price: Number
    },
    required: true
  },
  industry: {
    type: {
      qty: String,
      price: Number
    },
    required: true
  },
  gmp_requirement: {
    type: {
      qty: Boolean,
      price: Number
    },
    required: true
  },
  bottle_moc: {
    type: {
      qty: String,
      price: Number
    },
    required: true
  },
  water_saving: {
    type: {
      qty: Boolean,
      price: Number
    },
    required: true
  },
  filters_required: {
    type: {
      qty: Boolean,
      price: Number
    },
    required: true
  },
  illumination_required: {
    type: {
      qty: Boolean,
      price: Number
    },
    required: true
  },
  auto_level_tank: {
    type: {
      qty: Boolean,
      price: Number
    },
    required: true
  },
  extra_cups_sets: {
    type: {
      qty: Number,
      price: Number
    },
    required: true
  },
  other_details: {
    type: String
  },
  customer_details: {
    type: {
      name: String,
      address: String,
      person_of_contact: {
        title: String,
        name: String
      },
      contact_no: String
    },
    required: true
  },
  created_by: {
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
