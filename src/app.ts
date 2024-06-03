import { Application } from "../lib";

const app = new Application();

app.use(async (ctx, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  console.log(`${ctx.req.method} ${ctx.req.url} - ${ms}ms`);
});

app.use(async ctx => {
  ctx.res.writeHead(200, { 'Content-Type': 'text/plain' });
  ctx.res.write('Hello World');
});

app.listen(3000, () => {
  console.log('App is listening on port 3000');
});
