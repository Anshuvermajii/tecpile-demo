const express = require('express')
const router = express.Router();
const Employee = require('../models/emp')

router.get('/getemp', async (req, res) => {

    const emp = await Employee.find()
    if (emp) {

        res.status(201).json({ message: "emp find successfully", emp })
    } else {

        res.status(400).json({ message: "api me kuch wrong he" })

    }

})


router.post('/create', async (req, res) => {
    try {
        const data = req.body
        const newData = await Employee.create(data)
        res.status(200).json({ message: "success", newData })
    } catch (err) {
        console.error(err); // Log the error for more details
        res.status(500).json({ message: err.message });
    }
});




router.delete('/deleteemp/:id', async (req, res) => {

    try {
        const data = req.params.id
        const deletedata = await Employee.findByIdAndDelete(data)
        if (!deletedata) {

            return res.status(404).json({ message: "emp not found" })
        }
        res.json({ message: "deleted successfully", deletedata })

    } catch (err) {
        res.status(500).json({ message: err.message })


    }

})

router.put('/edit/:id', async (req, res) => {

    try {

        const data = req.params.id
        console.log(data)
        const newData = await Employee.findByIdAndUpdate(data, req.body, { new: true })

        if (!newData) {
            return res.status(404).json({ message: "emp not found" })

        }
        return res.json({ message: "adit successfuly", newData })

    } catch (err) {
        res.status(500).json({ message: err.message })


    }

})




module.exports = router
