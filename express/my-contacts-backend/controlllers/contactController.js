const asyncHandler = require('express-async-handler')
const Contact = require('../models/contactModel')

//  base route  /api/contacts/

const getContacts = asyncHandler(async (req, res) => {
    const contacts = await Contact.find({ user_id: req.user.id })
    // console.log(typeof(contacts.user_id))
    // console.log('contacts', contacts);
    res.status(200).json(contacts)
})

const createContact = asyncHandler(async (req, res) => {
    const { name, email, phone } = req.body

    if (!name || !email || !phone) {
        res.status(400)
        throw new Error('All fields are mandatory')
    }
    console.log(req.body);

    const contact = await Contact.create({

        user_id: req.user.id,
        // since key and value are same(es6 il ingnen)
        name,
        email,
        phone
    })


    res.status(201).json(contact)
})

const getContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id)

    if (!contact) {
        res.status(404)
        throw new Error('Contact Not Found')
    }
    res.status(200).json(contact)
})



const updateContact = asyncHandler(async (req, res) => {

    const contact = await Contact.findById(req.params.id)



    if (!contact) {
        res.status(404)
        throw new Error('Contact not found')
    }



    if (contact.user_id.toString() !== req.user.id) {
        res.status(403)
        throw new Error('User dont have permission to update')
    }
    const updatedContact = await Contact.findByIdAndUpdate(req.params.id, req.body, { new: true })
    res.status(200).json(updatedContact)
})



const deleteContact = asyncHandler(async (req, res) => {

    const contact = await Contact.findById(req.params.id)

    if (!contact) {
        res.status(404)
        throw new Error('Contact not found')
    }

    if (contact.user_id.toString() !== req.user.id) {
        res.status(403)
        throw new Error('User dont have permission to delete')
    }

    await Contact.findByIdAndDelete(req.params.id)

    res.status(200).json(contact)
})


module.exports = { getContacts, createContact, getContact, updateContact, deleteContact }