import * as http from 'http';
import { Context, Middleware } from "./type";

export class Application {
  private middlewares: Middleware[] = [];

  use(middleware: Middleware) {
    this.middlewares.push(middleware);
  }

  private compose(middlewares: Middleware[]) {
    return async (ctx: Context) => {
      const dispatch = async (i: number): Promise<void> => {
        if (i >= middlewares.length) return;
        const middleware = middlewares[i];
        await middleware(ctx, () => dispatch(i + 1));
      };
      await dispatch(0);
    };
  }

  listen(port: number, callback?: () => void) {
    const server = http.createServer(async (req, res) => {
      const ctx: Context = { req, res };
      const fn = this.compose(this.middlewares);
      await fn(ctx);
      res.end();
    });

    server.listen(port, callback);
  }
}