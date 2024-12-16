const { Validator } = require('node-input-validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const tenants = require('../models/tenants_schema')
const users = require('../models/users_schema')
const projects = require('../models/projects_schema')

const jwtsecret = 'clearquote'

exports.tenant_register = async (req, res) => {
    const v = new Validator(req.body, {
        tenant_name: 'required',
    })
    v.check().then(async (matched) => {
        if (!matched) {
            res.send(v.errors);
        }
        else {
            let reqData = req.body;
            let tenantExists = await tenants.findOne({ tenant_name: reqData.tenant_name }, { tenant_name: 1 })
            if (tenantExists == null) {
                if (reqData.password) {
                    reqData.password = await bcrypt.hash(reqData.password, 10)
                }
                reqData.tenant_id = Math.random().toString(36).substr(2, 9)
                let isTenants = await tenants.create(reqData)
                if (isTenants) {
                    let token = await jwt.sign({
                        data: reqData._id
                    }, jwtsecret, { expiresIn: '1h' });
                    res.json({
                        status: true,
                        message: "Tenant registration successful",
                        token: token
                    })
                }
                else {
                    res.json({
                        status: false,
                        message: "Tenant registration failed",
                    })
                }
            }
            else {
                res.json({
                    status: false,
                    message: "Tenant name already exists"
                })
            }
        }
    });
}

exports.user_register = async (req, res) => {
    const v = new Validator(req.body, {
        name: 'required',
        email: 'required|email',
        password: 'required',
        role: 'required'
    })
    v.check().then(async (matched) => {
        if (!matched) {
            res.send(v.errors);
        }
        else {
            let reqData = req.body;
            let useremailExists = await users.findOne({ email: reqData.email }, { email: 1 })
            if (useremailExists == null) {
                reqData.password = await bcrypt.hash(reqData.password, 10)
                reqData.tenant_id = req.params.tenant_id
                let isUsers = await users.create(reqData)
                if (isUsers) {
                    res.json({
                        status: true,
                        message: "User registration successful",
                    })
                }
                else {
                    res.json({
                        status: false,
                        message: "User registration failed",
                    })
                }
            }
            else {
                res.json({
                    status: false,
                    message: "User Email already exists"
                })
            }
        }
    });
}

exports.projects = async (req, res) => {
    let tenant_id = req.params.tenant_id;
    let projectdetails = await projects.findOne({
        tenant_id: tenant_id
    }, { name: 1, description: 1, created_at: 1 })
    if (projectdetails) {
        res.json({
            status: true,
            message: 'Project Data found',
            data: projectdetails
        })
    }
    else {
        res.json({
            status: false,
            message: 'Project Data not found'
        })
    }
}

exports.create_projects = async (req, res) => {
    let reqData = req.body;
    console.log(req.user.user_id)
    let data = {
        tenant_id: req.params.tenant_id,
        manager_id:
            req.user.role == 'Manager' ? req.user.user_id : '',
        name: reqData.name,
        description: reqData.description,
    }

    let isProjects = await projects.create(data)
    if (isProjects) {
        res.json({
            status: true,
            message: 'Project added successfully'
        })
    }
    else {
        res.json({
            status: false,
            message: "Error occured while adding project"
        })
    }

}

exports.update_projects = async (req, res) => {
    let reqData = req.body;

    reqData.manager_id = req.user.user_id

    let isProjectUpdated = await projects.updateOne({ tenant_id: req.params.tenant_id }, { $set: reqData })
    if (isProjectUpdated) {
        res.json({
            status: true,
            message: 'Project updated successfully'
        })
    }
    else {
        res.json({
            status: false,
            message: "Error occured while updating project"
        })
    }
}

exports.delete_projects = async (req,res) =>
{
    let reqData = req.body;

    reqData.manager_id = req.user.user_id

    let isProjectDeleted = await projects.deleteOne({ tenant_id: req.params.tenant_id })
    if (isProjectDeleted) {
        res.json({
            status: true,
            message: 'Project deleted successfully'
        })
    }
    else {
        res.json({
            status: false,
            message: "Error occured while deleting project"
        })
    }
}