import fs from 'fs-extra'

export default function registerRouter(app) {
  fs.readdirSync(__dirname).forEach( async (file) => {
    if (file !== "index.ts") {
      const { default: router } = await import(`./${file}`);
      app.use(router.routes()).use(router.allowedMethods());
    }
  });
};
