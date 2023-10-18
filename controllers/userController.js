const User = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const uuid = require('uuid')

exports.register = async (req, res) => {
  const { name, surname, email, username, password } = req.body

  try {
    const existingUser = await User.findOne({ email })

    if (existingUser) {
      return res
        .status(400)
        .json({ message: 'User with this email already exists' })
    }

    const id = uuid.v4()
    const newUser = new User({ id, name, surname, email, username, password })
    newUser.jobs = []

    await newUser.save()

    res.status(201).json({
      status: 'success',
      data: newUser
    })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: err.message })
  }
}
exports.login = async (req, res) => {
  const { username, password } = req.body

  try {
    const user = await User.findOne({ username })

    if (!user) {
      return res.status(401).json({ message: 'User not found' })
    }

    const isPasswordValid = await (password === user.password)

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid password' })
    }

    res.json({ user })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'An error occurred during login' })
  }
}
