const roles = require('../models/roles_schema')

exports.roles = async (req, res) => {
    let reqData = req.body;
    let data = {
        role_name: reqData.role_name,
        permissions:
            reqData.permissions
    }
    let isRoles = await roles.create(data)
    if (isRoles) {
        res.json({
            status: true,
            message: 'Roles added successfully'
        })
    }
    else {
        res.json({
            status: false,
            message: "Error while adding roles"
        })
    }
}

