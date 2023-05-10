// base url is /api/movies

module.exports = (req, res) => {


    let baseUrl = req.url.substring(0, req.url.lastIndexOf('/') + 1) // we'll get 
    //      /api/movies/

    let id = req.url.split('/')[3]   
    // console.log(uuid)

     /* regular expression pattern for UUIDs in the format specified by RFC 4122 using the syntax of version 4 of the PCRE (Perl Compatible Regular Expressions) library:
     /^[a-f0-9]{8}-[a-f0-9]{4}-[1-5][a-f0-9]{3}-[89ab][a-f0-9]{3}-[a-f0-9]{12}$/i
     i  flag for case insensitive */


    const regExpV4 = new RegExp(/^[a-f0-9]{8}-[a-f0-9]{4}-[1-5][a-f0-9]{3}-[89ab][a-f0-9]{3}-[a-f0-9]{12}$/i)



    if (req.url === '/api/movies') {

        res.statusCode = 200;
        res.write(JSON.stringify(req.movies))
        res.end()
    }

    else if (!regExpV4.test(uuid)) {
        res.writeHead(400, { "Content-Type": "application/json" })
        res.end(JSON.stringify({
            title: 'Validation Failed',
            message: 'UUID Not found'
        })
        )
    }

    else if (baseUrl === '/api/movies/' && regExpV4.test(uuid)) {

        const filteredMovie = req.movies.filter(
            (movie) => {
                return movie.id === uuid
            }
        )
        if (filteredMovie.length > 0) {
            res.statusCode = 200
            res.write(JSON.stringify(filteredMovie))

            res.end()
        }

        else {
            res.writeHead(404, { title: 'Not Found', message: 'movie not found' })
            res.end()
        }
    }

    else {
        res.writeHead(404, { title: 'Not Found', message: 'Route not found' })
    }
}