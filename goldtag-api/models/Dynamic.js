const mongoose = require("mongoose");

const dynSchema = new mongoose.Schema({
  belong: {
    type: mongoose.Types.ObjectId,
    required: [true, " parent id is required"],
  },
  title: {
    type: String,
  },
  category: {
    type: String,
    required:[true,'content category is necessary']
  },
  inContent: {
    type: Array,
    default:[[]]
  },
  isActive:{
      type:Boolean,
      default:true,
  }
});

module.exports = mongoose.model("Dynamic", dynSchema);
