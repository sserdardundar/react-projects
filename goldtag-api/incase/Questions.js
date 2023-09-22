const mongoose = require("mongoose");

const questionsSchema = new mongoose.Schema({
  belong: {
    type: mongoose.Types.ObjectId,
    required: [true, " parent subheader is required"],
  },
  title: {
    type: String,
    required: [true, "Questions title is required"],
  },
  description: {
    type: String,
  },
});
module.exports = mongoose.model("Questions", questionsSchema);
