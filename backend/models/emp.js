const mongoose = require('mongoose')
//schema 
const schmaData = new mongoose.Schema({
    name: {
        type: String,
        require: true

    },
    email: {
        type: String,
        require: true

    },
    password: {

        type: String,
        require: true

    },
    mobile:{
type:String,
require:true

    }


}, {

    timestamps: true

})
const Employee = mongoose.model("Employee", schmaData)
module.exports = Employee;
