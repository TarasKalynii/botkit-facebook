const { Schema, model } = require('mongoose');

const purchaseSchema = new Schema({
  sku: String,
  phoneNumber: String,
  userId: String,
  userDBId: { type: Schema.Types.ObjectId, ref: 'User' },
  lat: String,
  long: String,
  free: Boolean,
  ended: Boolean,
}, {
  timestamps: true,
});

module.exports = model('Purchase', purchaseSchema);
