const Profile = require('./profile.model')
const { put, del } = require('@vercel/blob')

const patchProfile = async (req, res) => {

    try {

        const updates = {}

        const profileData = await Profile.findOne({
            owner: req.user.userId
        })

        // TEXT FIELDS

        if (req.body.name !== undefined) {
            updates.name = req.body.name.trim()
        }

        if (req.body.bio !== undefined) {
            updates.bio = req.body.bio.trim()
        }

        if (req.body.title !== undefined) {
            updates.title = req.body.title.trim()
        }

        // PROFILE PIC

        const profilePicFile = req.files?.profilePic?.[0]

        if (profilePicFile) {

            const profilePicURL = await uploadProfilePic(profilePicFile)

            updates.profilePicURL = profilePicURL
        }

        // RESUME

        const resumeFile = req.files?.resume?.[0]

        if (resumeFile) {

            const resumeURL = await uploadResume(resumeFile)

            updates.resumeURL = resumeURL
        }

        // EMPTY REQUEST CHECK

        if (Object.keys(updates).length === 0) {

            return res.status(400).json({
                error: "No fields provided"
            })

        }

        // UPDATE / CREATE PROFILE

        const updatedProfile = await Profile.findOneAndUpdate(
            {
                owner: req.user.userId
            },
            {
                $set: updates,
                $setOnInsert: {
                    owner: req.user.userId
                }
            },
            {
                new: true,
                upsert: true,
                runValidators: true
            }
        )

        // DELETE OLD PROFILE PIC

        if (
            profilePicFile &&
            profileData?.profilePicURL
        ) {
            await del(profileData.profilePicURL, {
                token: process.env.BLOB_READ_WRITE_TOKEN
            })

        }

        // DELETE OLD RESUME

        if (
            resumeFile &&
            profileData?.resumeURL
        ) {

            await del(profileData.resumeURL, {
                token: process.env.BLOB_READ_WRITE_TOKEN
            })

        }

        res.status(200).json(updatedProfile)

    } catch (error) {

        res.status(500).json({
            error: error.message
        })

    }
}

const uploadProfilePic = async (file) => {

    if (!file) return null

    const filename = `profile-pic/profile-pic-${Date.now()}`

    const blob = await put(
        filename,
        file.buffer,
        {
            access: "public",
            token: process.env.BLOB_READ_WRITE_TOKEN
        }
    )

    return blob.url
}

const uploadResume = async (file) => {

    if (!file) return null

    const filename = `resume/resume-${Date.now()}`

    const blob = await put(
        filename,
        file.buffer,
        {
            access: "public",
            token: process.env.BLOB_READ_WRITE_TOKEN,
            contentType: "application/pdf"
        }
    )

    return blob.url
}

const getProfile = async (req, res) => {

    try {

        const profile = await Profile.findOne({
            owner: req.user.userId
        })

        if (!profile) {
            return res.status(404).json({
                error: "Profile not found"
            })
        }

        res.status(200).json(profile)

    } catch (error) {

        res.status(500).json({
            error: error.message
        })

    }
}

module.exports = {
    patchProfile,
    getProfile
}
