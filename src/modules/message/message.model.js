const mongoose = require("mongoose");

const MessageSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    owner:{
      type:String,
      ref:"User",
      required:true
    }
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Message", MessageSchema);
