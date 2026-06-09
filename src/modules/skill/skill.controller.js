const Skill = require('./skill.model')

const createSkill = async (req,res) => {
    try{
        const {name,type} = req.body
        const newSkill = await Skill.create({
            name,
            type: type.toLowerCase(),
            owner:req.user.userId.toString()
        })
        res.status(201).json({
          message:`[${newSkill.name}:${newSkill.type}] added successfully`,
        })
    } catch(error){
        res.status(500).json({
            message : "Server error : Failed to create message",
            error: error.message
        })
    }
}

const getSkills = async (req,res) =>{
    try{
        const skills = await Skill.find({
            owner:req.user.userId.toString()
        })
        .sort({createdAt:-1})
        if(skills.length === 0){
            return res.status(404).json({message:"Skill not found"})
        }
        res.status(200).json(skills)
    }catch(error){
        res.status(500).json({
            message: "Server error : Failed to fetch messages",
            error: error.message
        })
    }
}

const deleteSkill = async (req,res) => {
    try{
        const {id} = req.params
        await Skill.findByIdAndDelete({
            _id:id,
            owner:req.user.userId.toString(),
        })
        res.status(200).json({message:`[${deletedSkill.name}:${deletedSkill.type}] deleted successfully`})
    }catch(error){
        res.status(500).json({
            message: "Server error : Failed to delete message",
            error: error.message
        })
    }
}


module.exports = {
    createSkill,
    getSkills,
    deleteSkill,
}
