import * as http from 'http';

export type Request = http.IncomingMessage;
export type Response = http.ServerResponse;

export interface Context {
  req: Request;
  res: Response;
}

export type Middleware = (ctx: Context, next: () => Promise<void>) => void | Promise<void>;
