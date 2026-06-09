const express = require('express')
const router = express.Router()
const upload = require('../../config/multer')
const { getProjects, createProject, deleteProject, updateProject } = require('./project.controller')

router.get('/',getProjects)
router.post('/',upload.single('image'),createProject)
router.delete('/:id',deleteProject)
router.patch('/:id',upload.single("image"),updateProject)

module.exports = router