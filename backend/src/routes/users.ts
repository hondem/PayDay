import Router from 'koa-router'
import Controller from '../controllers/users'

const router: Router = new Router()

router.get('/users', Controller.getAll)

export default router.routes()