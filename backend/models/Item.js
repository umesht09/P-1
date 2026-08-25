const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      enum: ['Electronics', 'Apparel', 'Home Goods', 'Books', 'Other'],
    },
    description: {
      type: String,
    },
    price: {
      type: Number,
      required: [true, 'Price is required'],
      min: [0, 'Price cannot be negative'],
    },
    status: {
      type: String,
      required: [true, 'Status is required'],
      enum: ['In Stock', 'Out of Stock'],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Item', itemSchema);
