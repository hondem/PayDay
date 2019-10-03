import Router from 'koa-router'

/**
 * Importing all endpoints
 */
import Users from './users'


// Create new router
const router: Router = new Router()

router.use(Users)

export default router.routes()