const jwt = require('jsonwebtoken')
const jwtsecret = 'clearquote'



const authenticate = async (req,res,next) => {
        let authToken = req.headers.authorization.split(" ")[1]
        console.log(authToken,"authToken")
        if (authToken) {
            let userpayload = await jwt.verify(authToken, jwtsecret);
            req.user = {
                tenant_id: userpayload.data.tenant_id,
                role:  userpayload.data.role,
                user_id : userpayload.data.user_id
            };
            next()
        }
        else {
            res.json({
                status: false,
                message: 'Token not found'
            })
        }
    }




module.exports = authenticate;
