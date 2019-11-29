import Router from 'koa-router'
import Controller from '../controllers/wage'
import Auth from '../middleware/auth'

const router: Router = new Router()

router.get('/companies/:companyId/employees/:employeeId/wage', Controller.getByEmployee)
router.get('/companies/:companyId/employees/:employeeId/wage/:date', Controller.getByEmployeeAndDate)

router.post('/companies/:companyId/employees/:employeeId/wage', Controller.create)

export default router.routes()