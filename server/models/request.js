const mongoose = require("mongoose");

const requestSchema = new mongoose.Schema({
  motherId: String,
  name: String,
  date: Date,
  purpose: String,
  childBirth: String,
  phone: String,
  amount: Number,
  childName: String,
  childAge: Number,
  approved: { type: Boolean, default: null }, // To track approval status
});

const Request = mongoose.model("Request", requestSchema);

module.exports = Request;
