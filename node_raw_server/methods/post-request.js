// imports
const crypto = require('crypto')
const reqBodyParser = require('../util/body-parser')
const writeToFile = require('../util/write-to-file')

module.exports = async (req, res) => {
    if (req.url === '/api/movies') {
        try {

            let body = await reqBodyParser(req)
            console.log('body is:', body)
            body.id = crypto.randomUUID()

            req.movies.push(body)

            writeToFile(req.movies)


            res.writeHead(201, { "Content-type": "application/json" })
            res.end()
        } catch (error) {
            console.log(error)

            res.writeHead(400, { "Content-type": "application/json" })
            res.end(

                JSON.stringify({
                    title: "validation failed",
                    messsage: "Request body is not valid"
                })
            )
        }

    }

}
