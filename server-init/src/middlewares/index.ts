import cors from '@koa/cors'
import Koa from "koa"
import { koaBody } from "koa-body"
import koaMorgan from 'koa-morgan'
import onerror from 'koa-onerror'
import views from "koa-views"
import path from 'path'
import { catchMiddleware, restMiddleware } from './baseMiddleware'


export default async function registerMiddleware(app: Koa) {
  // error处理
  onerror(app)

  app.use(cors())

  app.use(
    koaBody({
      multipart: true,
    })
  )
  app.use(
    views(path.join(process.cwd(), './dist'), {
      map: {
        html: 'ejs',
      },
    })
  )

  app.use(koaMorgan(process.env.NODE_ENV || 'dev'))

  app.use(catchMiddleware)
  app.use(restMiddleware)
}