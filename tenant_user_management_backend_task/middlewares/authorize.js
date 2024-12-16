const roles = require('../models/roles_schema');

const authorize = (requiredPermission) => {
     return async (req, res, next) => {
             const userRole = req.user?.role;  
             if (!userRole) {
                 return res.json({
                     status: false,
                     message: 'Unauthorized: No role provided',
                 });
             }
 
             const role = await roles.findOne({ role_name: userRole });
 
             if (!role) {
                 return res.json({
                     status: false,
                     message: 'Unauthorized: Role not found',
                 });
             }
 
             if (!role.permissions.includes(requiredPermission)) {
                 return res.json({
                     status: false,
                     message: `Forbidden: You do not have the '${requiredPermission}' permission`,
                 });
             }
              next();
     
     };
 };

 module.exports = authorize;

