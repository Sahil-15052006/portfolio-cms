const express = require('express')

const upload = require('../../config/multer')

const { patchProfile,getProfile } = require('./profile.controller')

const router = express.Router()

router.patch(
    '/update',
    upload.fields([
        {
            name: 'profilePic',
            maxCount: 1
        },
        {
            name: 'resume',
            maxCount: 1
        }
    ]),
    patchProfile
)

router.get('/', getProfile)

module.exports = router
