import { Context, Next } from "koa"

export async function catchMiddleware(ctx: Context, next: Next) {
  try {
    await next()
    if (ctx.status === 404) {
      // 日志服务

    } else if (ctx.status === 500) {
      // 日志服务

    }
  } catch (error: any) {
    // 日志服务

    ctx.response.status = 500
    ctx.response.type = 'application/json'
    ctx.response.body = {
      success: false,
      desc: error.message,
      data: null,
    }
  }
}

export async function restMiddleware(ctx: Context, next: Next) {
  ctx.rest = (data: any, flag = true) => {
    ctx.response.type = 'application/json'
    ctx.response.body = flag
      ? {
        success: true,
        desc: null,
        data,
      }
      : {
        success: false,
        desc: data || '出错了',
        data: null,
      }
  }
  await next()
}

