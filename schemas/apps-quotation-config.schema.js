const mongoose = require("mongoose");

const AppQuotationConfigSchema = mongoose.Schema({
  config_name: {
    type: String,
    required: true,
    unique: true
  },
  speed: {
    type: {
      options: [
        {
          qty: Number,
          price: Number
        }
      ],
      default_option_index: Number
    },
    required: true
  },
  no_of_washes: {
    type: {
      options: [
        {
          qty: Number,
          price: Number
        }
      ],
      default_option_index: Number
    },
    required: true
  },
  industry: {
    type: {
      options: [
        {
          qty: String,
          price: Number
        }
      ],
      default_option_index: Number
    },
    required: true
  },
  gmp_requirement: {
    type: {
      options: [
        {
          qty: Boolean,
          price: Number
        }
      ],
      default_option_index: Number
    },
    required: true
  },
  bottle_moc: {
    type: {
      options: [
        {
          qty: String,
          price: Number
        }
      ],
      default_option_index: Number
    },
    required: true
  },
  water_saving: {
    type: {
      options: [
        {
          qty: Boolean,
          price: Number
        }
      ],
      default_option_index: Number
    },
    required: true
  },
  filters_required: {
    type: {
      options: [
        {
          qty: Boolean,
          price: Number
        }
      ],
      default_option_index: Number
    },
    required: true
  },
  illumination_required: {
    type: {
      options: [
        {
          qty: Boolean,
          price: Number
        }
      ],
      default_option_index: Number
    },
    required: true
  },
  auto_level_tank: {
    type: {
      options: [
        {
          qty: Boolean,
          price: Number
        }
      ],
      default_option_index: Number
    },
    required: true
  },
  extra_cups_sets: {
    type: {
      options: [
        {
          qty: Number,
          price: Number
        }
      ],
      default_option_index: Number
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
    default: false
  }
});

module.exports = AppQuotationConfigSchema;
