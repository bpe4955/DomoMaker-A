const mongoose = require('mongoose');
const _ = require('underscore');

const setName = (name) => _.escape(name).trim();

const DomoSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    set: setName,
    unique: true,
  },
  age: {
    type: Number,
    required: true,
    min: 0,
  },
  type: {
    type: String,
    required: false,
    trim: true,
    default: 'normal',
  },
  owner: {
    type: mongoose.Schema.ObjectId,
    required: true,
    ref: 'Account',
  },
  createdDate: {
    type: Date,
    default: Date.now,
  },
});

DomoSchema.statics.toAPI = (doc) => ({
  name: doc.name,
  age: doc.age,
  type: doc.type,
});

const DomoModel = mongoose.model('Domo', DomoSchema);
module.exports = DomoModel;
