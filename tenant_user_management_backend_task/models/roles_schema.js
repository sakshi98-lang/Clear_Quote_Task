const mongoose = require('mongoose')

const roles = new mongoose.Schema({
    role_name : {
        type : String,
    },
    permissions : {
        type : Array
    },
})

module.exports = mongoose.model('roles',roles)