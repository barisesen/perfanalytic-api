const mongoose = require('mongoose');

const MetricSchema = new mongoose.Schema({
  host: { type: String, unique: false, required: true },
  path: { type: String, unique: false, required: true },
  ttfb: { type: Number, unique: false, required: true },
  fcp: { type: Number, unique: false, required: true },
  dom_load: { type: Number, unique: false, required: true },
  window_load: { type: Number, unique: false, required: true },
});

module.exports = mongoose.model('Metric', MetricSchema);
