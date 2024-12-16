const mongoose = require('mongoose')

const tenants = new mongoose.Schema({
    tenant_name : {
        type : String,
        require : true
    },
    tenant_id : {
        type : String
    },
    admin_email : {
        type : String
    },
    password : {
        type : String
    },
    created_at : {
        type : Date,
        default : Date.now()
    }
})

module.exports = mongoose.model('tenants',tenants)