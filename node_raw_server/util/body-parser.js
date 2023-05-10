// If you use the async keyword in a function but don't use a Promise inside that function, the function will still return a Promise. This is because using the async keyword is a shorthand way of defining a function that returns a Promise.

module.exports = async (req) => {


    // ee orotta promise kond nink promisinte importance manassilavum, ith promise illathe cheeyan nokoo, asynchronous and promise vela manslaavum

    return new Promise((resolve, reject) => {

        try {

            let body = ""
            req.on('data', (chunk) => {
                console.log('chunk is:', chunk)
                body += chunk
            })

            req.on('end', () => {


                resolve(JSON.parse(body))
            })



        } catch (error) {


            console.log(error)

            reject(error)
        }
    }
    )
}

