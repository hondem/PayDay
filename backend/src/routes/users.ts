import Router from 'koa-router'
import Controller from '../controllers/users'

const router: Router = new Router()

router.get('/users', Controller.getAll)
router.get('/users/:id', Controller.getById)
router.post('/users/create', Controller.create)
router.patch('/users/:id', Controller.update)
router.patch('/users/:id/password', Controller.changePassword)

export default router.routes()