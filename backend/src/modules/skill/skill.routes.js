const express = require('express')
const { getSkills, createSkill, deleteSkill } = require('./skill.controller')
const router = express.Router()

router.get('/',getSkills)
router.post('/',createSkill)
router.delete('/:id',deleteSkill)
module.exports = router
