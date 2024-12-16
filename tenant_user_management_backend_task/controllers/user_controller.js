const { Validator } = require('node-input-validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const users = require('../models/users_schema')
const jwtsecret = 'clearquote'

exports.user_login = async (req, res) => {
    const v = new Validator(req.body, {
        email: 'required|email',
        password: 'required',
    })
    v.check().then(async (matched) => {
        if (!matched) {
            res.status(422).send(v.errors);
        }
        else {
            let reqData = req.body;
            let userdata = await users.findOne({ email: reqData.email }, { password: 1, _id: 1, tenant_id: 1, role: 1 })
            if (userdata != null) {
                let password = await bcrypt.compare(reqData.password, userdata.password)
                if (password) {
                    let payloadData = { user_id: userdata._id, role: userdata.role, tenant_id: userdata.tenant_id }
                    let token = await jwt.sign({
                        data: payloadData
                    }, jwtsecret, { expiresIn: '1h' });
                    res.json({
                        status: true,
                        message: "Login successful",
                        token: token
                    })
                }
                else {
                    res.json({
                        status: false,
                        message: "Invalid Login Credentials",
                    })
                }
            }
            else {
                res.json({
                    status: false,
                    message: "User Email does not exist"
                })
            }
        }
    });
}

