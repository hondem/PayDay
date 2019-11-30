import Router from 'koa-router'
import Controller from '../controllers/folders'
import Auth from '../middleware/auth'

const router: Router = new Router()

router.get('/companies/:companyId/employees/:employeeId/folders', Controller.getByEmployeeId)
router.get('/companies/:companyId/employees/:employeeId/folders/:identifier', (ctx) => {
  // We have to test whether identifier is Date or ID
  if(new RegExp('\\d{4}-\\d{2}-\\d{2}', 'u').test(ctx.params.identifier)) {
    ctx.params.date = ctx.params.identifier
    return Controller.getByEmployeeIdAndMonth(ctx)
  } else {
    ctx.params.folderId = ctx.params.identifier
    return Controller.getById(ctx)
  }
})
router.post('/companies/:companyId/employees/:employeeId/folders', Controller.create)
router.patch('/companies/:companyId/employees/:employeeId/folders/:folderId', Controller.update)
router.delete('/companies/:companyId/employees/:employeeId/folders/:folderId', Controller.remove)

export default router.routes()