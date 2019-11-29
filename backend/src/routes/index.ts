import Router from 'koa-router'

/**
 * Importing all endpoints
 */
import Users from './users'
import Companies from './companies'
import Employees from './employees'
import Wage from './wage'


// Create new router
const router: Router = new Router()

router.use(Users)
router.use(Companies)
router.use(Employees)
router.use(Wage)

export default router.routes()