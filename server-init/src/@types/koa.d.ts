import * as Koa from 'koa';

declare module 'koa' {
  interface Context {
    rest: (data: any, flag?: boolean) => void
  }
}