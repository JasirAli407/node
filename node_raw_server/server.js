const http = require('http')
require('dotenv').config()
let movies = require('./data/movies.json')
// console.log( movies)

const getRequest = require('./methods/get-request')
const putRequest = require('./methods/put-request')
const postRequest = require('./methods/post-request')
const deleteRequest = require('./methods/delete-request')

// console.log(getRequest)


const PORT = process.env.PORT || 5001

const server = http.createServer((req, res) => {
    // console.log(req.url)

    req.movies = movies
    switch (req.method) {

        case 'GET':
            getRequest(req, res)

            break

        case 'POST':
            postRequest(req, res)
            break

        case 'PUT':
            
        putRequest(req, res)
            break

        case 'DELETE':

             deleteRequest(req, res)
            break

        default:
            res.statusCode = 404;
            res.setHeader("Content-Type", "application/json")
            res.write(JSON.stringify({
                title: 'Not Found',
                message: "Route Not Found"
            }))
            res.end()

    }




})

server.listen(PORT, () => {
    

    console.log(`server up and running on port ${PORT}`)
})



