import Router from 'koa-router'
import Controller from '../controllers/folders'
import Auth from '../middleware/auth'

const router: Router = new Router()

router.get('/companies/:companyId/employees/:employeeId/folders', Controller.getByEmployeeId)
router.get('/companies/:companyId/employees/:employeeId/folders/:date', Controller.getByEmployeeIdAndMonth)
router.post('/companies/:companyId/employees/:employeeId/folders', Controller.create)
router.patch('/companies/:companyId/employees/:employeeId/folders/:folderId', Controller.update)
router.delete('/companies/:companyId/employees/:employeeId/folders/:folderId', Controller.remove)

export default router.routes()