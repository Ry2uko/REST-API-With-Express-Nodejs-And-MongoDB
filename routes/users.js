const express = require('express')
const router = express.Router()
const User = require('../models/user')

// Getting All
router.get('/', async (req, res) => {
    try {
        const users = await User.find()
        res.json(users) 
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

// Getting One
router.get('/:id', getUser, (req, res) => {
    res.json(res.user)
})

// Creating One
router.post('/', async (req, res) => {
    const user = new User({
        name: req.body.name,
        followedUser: req.body.followedUser
    })
    try {
        const newUser = await user.save()
        res.status(201).json(newUser)
    } catch(err) {
        res.status(400).json({ message: err.message })
    }
})

// Updating One
router.patch('/:id', getUser, async  (req, res) => {
    if (req.body.name != null) {
        res.user.name = req.body.name
    }
    if (req.body.followedUser != null) {
        res.user.followedUser = req.body.followedUser
    }
    try {
        const updatedUser = await res.user.save()
        res.json(updatedUser)
    } catch(err) {
        res.status(400).json({ message: err.message })
    }
})

// Deleting All (test)
router.delete('/all', async (req, res) => {
    try {
        await User.remove({})
        res.json({ message: 'Removed all users' })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

// Deleting One
router.delete('/:id', getUser, async (req, res) => {
    try {
        await res.user.remove()
        res.json({ message: 'Deleted User' })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

async function getUser(req, res, next) {
    let user
    try {
        user = await User.findById(req.params.id)
        if (user == null) {
            return res.status(404).json({ message: 'User not found' })
        }
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }

    res.user = user
    next()
}

module.exports = router

// change id to find name