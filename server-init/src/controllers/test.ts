import { Context } from "koa";

export async function getTest(ctx: Context) {
  ctx.rest('test')
}