const mongoose = require('mongoose')

const users = new mongoose.Schema({
    tenant_id : {
        type : String,
    },
    name : {
        type : String,
        require : true
    },
    email : {
        type : String,
        require : true
    },
    password : {
        type : String,
        require : true
    },
    role : {
        type : String,
        require : true
    },
    created_at : {
        type : Date,
        default : Date.now()
    }
})

module.exports = mongoose.model('users',users)