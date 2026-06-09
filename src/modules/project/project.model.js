const mongoose = require("mongoose");

const ProjectSchema = mongoose.Schema(
  {
    imageURL: {
      type: String,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    githubURL: {
      type: String,
      required: true,
    },
    tags: {
      type: String,
      required: true,
    },
    demoURL: {
      type: String,
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

module.exports = mongoose.model("Project", ProjectSchema);
