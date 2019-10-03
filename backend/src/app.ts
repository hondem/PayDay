import Koa from 'koa'

// Importing config
import Config from './config'

// Routing
import Routes from './routes'

// Utils
import logger from './utils/logger'

// Middlewares
import koaBodyparser from 'koa-bodyparser'
import koaCompress from 'koa-compress'
import koaCors from 'kcors'
import loggerMiddleware from './middleware/logger'

const app: any = new Koa()

app.use(koaCompress())
app.use(koaCors(Config.server.cors))
app.use(koaBodyparser())
app.use(loggerMiddleware)
app.use(Routes)

/**
 * Server start
 */
app.start = async() => {
  logger.info("Starting app...")
  // Start database connection
  // await database.start()
}

app.stop = () => {
  logger.info("Stopping app...")
}

app.listen(Config.server.port, () => {
  logger.info(`App has started on port: ${Config.server.port} :)`)
})

if (require.main === module){
  app.start()
}

/**
 * If application is closing
 */
process.once('SIGINT', () => { app.stop() })
process.once('SIGTERM', () => { app.stop() })

export default app