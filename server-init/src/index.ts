import Koa from 'koa'
import registerRouter from './routes';

import registerMiddleware from './middlewares';

async function main() {
  const app = new Koa()

  // 注册中间件
  registerMiddleware(app)

  // 注册路由
  registerRouter(app)

  app.listen(3000, () => {
    console.log(`🚀 App start on: http://localhost:3000`)
  })
}

main().catch(console.error)