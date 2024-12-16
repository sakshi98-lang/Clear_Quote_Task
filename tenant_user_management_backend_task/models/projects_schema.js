const mongoose = require('mongoose')

const projects = new mongoose.Schema({
    tenant_id: {
        type: String,
    },
    manager_id: {
        type: mongoose.Types.ObjectId,
        ref: 'users'
    },
    name: {
        type: String,
        require: true
    },
    description : {
        type : String,
    },
    created_at: {
        type: Date,
        default : Date.now()
    },
})

module.exports = mongoose.model('projects', projects)