import Router from 'koa-router'
import Controller from '../controllers/users'
import auth from '../middleware/auth'

const router: Router = new Router()

router.get('/users', auth, Controller.getAll)
router.get('/users/:id', Controller.getById)

router.post('/users/create', Controller.create)
router.post('/users/login', Controller.login)

router.patch('/users/:id', Controller.update)
router.patch('/users/:id/password', Controller.changePassword)

export default router.routes()