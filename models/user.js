const { Schema, model } = require('mongoose');

const userSchema = new Schema({
  id: String,
  freeProducts: Number,
  referalCount: Number,
  purchases: [{ type: Schema.Types.ObjectId, ref: 'Purchase' }],
  favoriteProductList: [String],
});

module.exports = model('User', userSchema);
