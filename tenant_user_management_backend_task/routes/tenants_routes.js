const express = require('express')
const router = express.Router();
const tenants_controller = require('../controllers/tenants_controller')
const authenticate = require('../middlewares/authenticate')
const authorize = require('../middlewares/authorize')


router.post('/register',tenants_controller.tenant_register)

router.post('/:tenant_id/user',tenants_controller.user_register)

router.get('/:tenant_id/projects',tenants_controller.projects)

router.post('/:tenant_id/projects_create',authenticate,authorize('create'),tenants_controller.create_projects)

router.post('/:tenant_id/projects_update',authenticate,authorize('update'),tenants_controller.update_projects)

router.post('/:tenant_id/projects_delete',authenticate,authorize('delete'),tenants_controller.delete_projects)



module.exports = router;