import { Schema } from 'mongoose';

export const TokenSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  token: {
    type: String,
    required: true
  },
  uuid: {
    type: String,
    required: true
  },
  created_timestamp: {
    type: Date,
    required: true,
    default: Date.now
  },
  last_updated_timestamp: {
    type: Date,
    default: null
  },
  is_active: {
    type: Boolean,
    required: true,
    default: true
  }
});
