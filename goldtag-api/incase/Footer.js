const mongoose = require("mongoose");

const footerSchema = new mongoose.Schema({
  belong: {
    type: mongoose.Types.ObjectId,
    required: [true, " parent website name is required"],
  },
  title: {
    type: String,
  },
  category: {
    type: String,
  },
  proCount: {
    type: Number,
  },
  inContent: {
    type: Array,
  },
});

module.exports = mongoose.model("CommentSection", footerSchema);
