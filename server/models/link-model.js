const { Schema, model } = require('mongoose');

const schema = new Schema({
  originalLink: { type: String, required: true },
  shortLink: { type: String, required: true, unique: true },
  code: { type: String, required: true, unique: true },
  date: { type: Date, default: Date.now },
  clicks: { type: Number, default: 0 },
  owner: { type: Schema.Types.ObjectId, ref: 'User' },
});

module.exports = model('Link', schema);
