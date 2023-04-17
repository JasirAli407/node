const writeToFile = require('../util/write-to-file')

module.exports = (req, res) => {
    const baseUrl = req.url.substring(0, req.url.lastIndexOf('/') + 1)

    const id = req.url.split('/')[3]



    const regExpV4 = new RegExp(/^[a-f0-9]{8}-[a-f0-9]{4}-[1-5][a-f0-9]{3}-[89ab][a-f0-9]{3}-[a-f0-9]{12}$/i)

    if (!regExpV4.test(id)) {
        res.writeHead(400, { "Content-Type": "application/json" })
        res.end(JSON.stringify({
            title: 'Validation Failed',
            message: 'UUID Not found'
        })
        )
    } else if (baseUrl === '/api/movies/' && regExpV4.test(id)) {
        const index = req.movies.findIndex((movie) => {
            return movie.id === id
        })


        if (index === -1) {
            res.writeHead(404, { title: 'Not Found', message: 'movie not found' })
            res.end()
        } else {

            req.movies.splice(index, 1)

            writeToFile(req.movies)

            res.writeHead(204, { "Content-type": "application/json" })

            res.end()


        }
    } else {
        res.writeHead(404, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ title: "Not Found", message: "Route not found" }));


    }



}