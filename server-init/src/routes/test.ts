import Router from '@koa/router'
import { testController } from '../controllers'

const router = new Router({
  prefix: '/test'
})

router.get('/', testController.getTest)

export default router