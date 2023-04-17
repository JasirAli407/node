const asyncHandler = require('express-async-handler')
const jwt = require('jsonwebtoken')


const validateToken = asyncHandler((req, res, next) => {

    let token;
    let authHeader = req.headers.Authorization || req.headers.authorization
    console.log('isssssss', authHeader);
    if (authHeader && authHeader.startsWith("Bearer")) {
        token = authHeader.split(' ')[1]

        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
            if (err) {
                res.status(401)
                throw new Error("user is not authorized")
            }

            console.log(decoded);
            req.user = decoded.user;
            next()
        })

        if(!token){
            res.status(401)
            throw new Error("NOt authorized")
        }


    } else {

        res.status(401)
        throw new Error(' token is misssing')

    }

})

module.exports = validateToken;