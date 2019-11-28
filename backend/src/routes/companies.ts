import Router from 'koa-router'
import Controller from '../controllers/companies'
import Auth from '../middleware/auth'

const router: Router = new Router()

router.get('/companies', Controller.getAll)
router.get('/companies/:id', Controller.getById)
router.post('/companies/create', Controller.create)
router.patch('/companies/:id', Controller.update)

router.get('/companies/:companyId/employees', Controller.getEmployeesByCompany)
router.get('/companies/:companyId/employees/:employeeId', Controller.getEmployeeByIdInCompany)
router.post('/companies/:companyId/employees', Controller.createEmployee)
router.patch('/companies/:companyId/employees/:employeeId', Controller.updateEmployee)
router.delete('/companies/:companyId/employees/:employeeId', Controller.removeEmployee)

export default router.routes()