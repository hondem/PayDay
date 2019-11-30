import Router from 'koa-router'
import Controller from '../controllers/wage'
import Auth from '../middleware/auth'

const router: Router = new Router()

router.get('/companies/:companyId/employees/:employeeId/wage', Controller.getByEmployee)
router.get('/companies/:companyId/employees/:employeeId/wage/:date', Controller.getByEmployeeAndDate)
router.patch('/companies/:companyId/employees/:employeeId/wage/:date', Controller.update)
router.post('/companies/:companyId/employees/:employeeId/wage', Controller.create)
router.delete('/companies/:companyId/employees/:employeeId/wage/:date', Controller.remove)

export default router.routes()