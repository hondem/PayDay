import Router from 'koa-router'
import Controller from '../controllers/companies'
import Auth from '../middleware/auth'

const router: Router = new Router()

router.get('/companies', Controller.getAll)
router.get('/companies/:id', Controller.getById)
router.post('/companies/create', Controller.create)
router.patch('/companies/:id', Controller.update)

export default router.routes()