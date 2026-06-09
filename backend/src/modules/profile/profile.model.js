const mongoose = require('mongoose')

const ProfileSchema = mongoose.Schema(
    {
        name:{
            type:String
        },
        bio:{
            type:String
        },
        title:{
            type:String
        },
        profilePicURL:{
            type:String,
        },
        resumeURL:{
            type:String,
        },
        owner:{
            type:String,
            ref:"User",
            required:true
        },
    },
    {
        timestamps:true
    }
)

module.exports = mongoose.model("Profile",ProfileSchema)
