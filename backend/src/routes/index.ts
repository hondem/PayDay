import Router from 'koa-router'

/**
 * Importing all endpoints
 */
import Users from './users'
import Companies from './companies'


// Create new router
const router: Router = new Router()

router.use(Users)
router.use(Companies)

export default router.routes()