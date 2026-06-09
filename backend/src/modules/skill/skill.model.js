const mongoose = require('mongoose')

const SkillSchema = mongoose.Schema(
    {
        name:{
            type:String,
            required:true
        },
        type:{
            type:String,
            required:true
        },
        owner:{
            type:String,
            ref:"User",
            required:true
        }
    },
    {
        timestamps:true
    }
)

module.exports = mongoose.model("Skill", SkillSchema)