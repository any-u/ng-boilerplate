/**
 * @desc 数据校验中间件
 * @param {function} validateFunc validators 里的校验器函数
 */
function validatorMiddleware(validateFunc) {
  return async function validator(ctx, next) {
    const { error } = await validateFunc(ctx);
    if (error) {
      console.log('校验器【 %s 】，数据校验失败', validateFunc.name);
      console.error(error);
      // 使用joi时的自定义错误||joi提供的错误展示
      ctx.rest(error.message || error.details[0].message, false)
      return;
    }
    await next();
  };
}

export default validatorMiddleware;