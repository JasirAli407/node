const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();
const db = require('../config/dbConnection');
const Sale = require('../models/saleModel');



router.get('/dataload', async (req, res) => {
    try {



        await Sale.deleteMany({})


        const dataRows = fs.readFileSync(path.join(__dirname, '..', '/data/data.txt'), 'utf8').trim().split(/['\r\n']+/);

        dataRows.shift();

        let dataArray = []
        for (let dataRow of dataRows) {

            const [date, item_name, , quantity, total_sales] = dataRow.split(',')
            let dataObj = { date, item_name, quantity, total_sales }
            dataArray.push(dataObj)

        }

        await Sale.insertMany(dataArray);

        res.status(201).json("data entered to DB")
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Something went wrong!' });
    }
})






router.get('/totalsales', async (req, res) => {
    try {

        const data = await Sale.aggregate([
            {
                $group: {
                    _id: {
                        itemName: '$item_name'
                    },
                    totalQuantity: { $sum: '$quantity' },
                    totalSales: { $sum: '$total_sales' },

                }

            },

            {
                $project: {
                    _id: 0,
                    item_name: '$_id.itemName',
                    totalQuantity: 1,
                    totalSales: 1,

                }
            }

        ])

        res.json(data)


    } catch (err) {

        console.error(err);
        res.status(500).json({ error: 'some error' })

    }
})




router.post('/createItem', async (req, res) => {

    try {

        // const { name, date, qty, total_price } = req.body

        await Sale.create(req.body);




        res.status(201).json("Success")


    } catch (error) {


        console.error(error)

        res.status(500).json('error')

    }



})






router.get('/totalsalesbymonth', async (req, res) => {

    const salesByMonth = await Sale.aggregate([

        {
            $group: {
                _id: {

                    $month: '$date'
                },
                totalSales: { $sum: '$total_sales' },

            }
        }
        ,
        {
            $addFields: {
                month: '$_id'
            }
        },
        {
            $project: {
                _id: 0,

            }
        }
    ])


    res.json(salesByMonth)



    // for (let result of results) {
    //     let month = result.month;

    //     //  console.log(month);
    //     switch (month) {

    //         case 1:
    //             month = 'january';
    //             break;

    //         case 2:
    //             month = 'february';
    //             break;

    //         case 3:
    //             month = 'march';
    //             break;

    //         case 4:
    //             month = 'april';
    //             break;


    //         case 5:
    //             month = 'may';
    //             break;


    //         case 6:
    //             month = 'june';
    //             break;

    //         case 7:
    //             month = 'july';
    //             break;

    //         case 8:
    //             month = 'august';
    //             break;

    //         case 9:
    //             month = 'september';
    //             break;

    //         case 10:
    //             month = 'october';
    //             break;


    //         case 11:
    //             month = 'november';
    //             break;

    //         case 12:
    //             month = 'december';
    //             break;

    //         default:
    //             ;
    //     }

    //     result.month = month;
    // }
    // res.status(200).json(results)
})





router.get('/popularitemofmonth', async (req, res) => {



    try {

        let { date } = req.body

        let year = Number(date.slice(0, 4));
        let month = Number(date.slice(5));

        const data = await Sale.aggregate([
            {
                $match: {
                    date: {
                        $gte: new Date(year, month - 1, 1),
                        $lte: new Date(year, month, 1)
                    }
                }
            },

            {
                $group: {

                    _id: '$item_name',
                    totalQuantity: {
                        $sum: '$quantity'
                    }
                }
            },

            {
                $sort: { totalQuantity: -1 }
            },
            {
                $limit: 1
            }
        ])


        res.json(data)



    } catch (error) {


        if (error) {
            console.error(error)
            res.status(500).json(error)
        }
    }
})



router.get('/mostrevenuebymonth/:date', async (req, res) => {


    try {


        console.log(req.params.date);

        let { date } = req.params

        let year = Number(date.slice(0, 4));
        let month = Number(date.slice(5));

        const data = await Sale.aggregate([
            {
                $match: {
                    date: {
                        $gte: new Date(year, month - 1, 1),
                        $lte: new Date(year, month, 1)
                    }
                }
            },

            {
                $group: {

                    _id: '$item_name',
                    totalRevenue: {
                        $sum: '$total_sales'
                    }
                }
            },

            {
                $sort: { totalRevenue: -1 }
            },
            {
                $limit: 1
            },

            {
                $project: {
                    _id: 0,
                    itemName: '$_id',
                    totalRevenue: 1
                }
            }
        ])


        res.json(data)



    } catch (error) {
        if (error) {
            console.error(error)
            res.status(500).json(error)
        }
    }
})








router.get('/mostrevenuebymonth', async (req, res) => {
    try {



        const data = await Sale.aggregate([    


            {
                $group: {

                    _id: {
                        month: { $month: '$date' },
                        itemName: '$item_name'
                    },
                    totalRevenue: {
                        $sum: '$total_sales'
                    }
                }
            },

            {
                $sort: {
                    '_id.month': 1,
                    totalRevenue: -1
                }
            },

            {
                $group: {
                    _id: '$_id.month',

                    topItem: {
                        $first: '$_id.itemName',
                    },
                    totalSales: {
                        $first: '$totalRevenue'
                    }
                },

            },


            {
                $project: {
                    _id: 0,
                    month: '$_id',
                    topItem: 1,
                    totalSales: 1
                }
            }
        ])


        res.json(data)





    } catch (error) {
        if (error) {
            console.error(error)
            res.status(500).json(error)
        }
    }
})

module.exports = router;
