const mongoose = require('mongoose')
const User = require('../models/userModel')
const asyncHandler = require('express-async-handler')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')


// base route /api/users
 
const registerUser = asyncHandler(async (req, res) => {

    console.log(req.body);
    const { username, email, password } = req.body

    if (!username || !email || !password) {


        res.status(400)

        throw new Error('All fields are mandatory')
    }



    const userAvailable = await User.findOne({ email })
    if (userAvailable) {
        res.status(400)
        throw new Error("User already registered")
    }
    //  hash password
    //   here 10 is the number of solved rounds for hashing
    const hashedPassword = await bcrypt.hash(password, 10)
    console.log('hashed: ', hashedPassword);

    const user = await User.create({ username, email, password: hashedPassword })

    if (user) {
        res.status(201).json({ _id: user.id, email: user.email })
    }
    else {
        res.status(400)
        throw new Error('User data is not valid')
    }
})



const loginUser = asyncHandler(async (req, res) => {

    const { email, password } = req.body;

    if (!email || !password) {
        res.status(400)
        throw new Error("All fields are mandatory")
    }

    const user = await User.findOne({ email })



    if (user && (await bcrypt.compare(password, user.password))) {

        const accessToken = jwt.sign({
            user: {
                username: user.username,
                email: user.email,
                id: user.id
            }
        },
            process.env.ACCESS_TOKEN_SECRET, { expiresIn: '50min' }
        )


        res.status(200).json({ accessToken })
    } else {

        res.status(401)
        throw new Error('Email or Password not valid')
    }





})


// desc@
// route@ GET /api/users/current
// access@ private
const currentUser = asyncHandler(async (req, res) => {

    
    res.status(201).json(req.user)
})

module.exports = { registerUser, currentUser, loginUser }