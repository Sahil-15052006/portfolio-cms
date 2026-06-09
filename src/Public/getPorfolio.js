const express = require("express");
const router = express.Router();

const Profile = require("../modules/profile/profile.model");
const Project = require("../modules/project/project.model");
const Skill = require("../modules/skill/skill.model");

const OWNER_ID = "6a0c63dad94ccaf315e22620";

router.get("/", async (req, res) => {
  try {

    console.log('request recived')
    const [profile, projects, skills] = await Promise.all([
      Profile.findOne({ owner: OWNER_ID }),
      Project.find({ owner: OWNER_ID }).sort({ createdAt: -1 }),
      Skill.find({ owner: OWNER_ID }).sort({ order: 1 }),
    ]);

    // console.log(profile,projects,skills)

    if (!profile) {
      return res.status(404).json({ message: "Owner profile not found" });
    }

    return res.json({ profile, projects, skills});
  } catch (error) {
    console.error("getPorfolio error:", error);
    return res
      .status(500)
      .json({
        message: "Failed to fetch portfolio data",
        error: error.message,
      });
  }
});

module.exports = router;
