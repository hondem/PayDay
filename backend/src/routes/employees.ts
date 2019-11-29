import Router from 'koa-router'
import Controller from '../controllers/employees'
import Auth from '../middleware/auth'

const router: Router = new Router()

router.get('/companies/:companyId/employees', Controller.getByCompany)
router.get('/companies/:companyId/employees/:employeeId', Controller.getByCompanyAndId)
router.get('/companies/:companyId/employees/:employeeId/calculate/:date', Controller.calculate)
router.post('/companies/:companyId/employees', Controller.create)
router.patch('/companies/:companyId/employees/:employeeId', Controller.update)
router.delete('/companies/:companyId/employees/:employeeId', Controller.remove)

export default router.routes()