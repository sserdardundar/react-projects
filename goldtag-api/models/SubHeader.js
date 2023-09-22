const mongoose = require("mongoose");

const subhSchema = new mongoose.Schema({
  belong: {
    type: mongoose.Types.ObjectId,
    required: [true, " parent website name is required"],
  },
  contentCount:{
    type:Number,
    default:0
  },
  title: {
    type: String,
    required: [true, "subheader title is required"],
  },
  isActive:{
      type:Boolean,
      default:true,
  }
});

module.exports = mongoose.model("SubHeader", subhSchema);
