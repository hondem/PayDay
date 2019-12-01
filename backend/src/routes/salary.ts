import Router from 'koa-router'
import Controller from '../controllers/salary'
import Auth from '../middleware/auth'

const router: Router = new Router()

router.get('/companies/:companyId/employees/:employeeId/salary', Controller.getByEmployeeId)
router.get('/companies/:companyId/employees/:employeeId/salary/:date', Controller.getByEmployeeIdAndDate)

export default router.routes()