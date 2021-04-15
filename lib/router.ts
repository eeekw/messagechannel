import { Middleware, MiddlewareNext } from "./channel";
import { MChannelContext } from "./context";

export default class MChannelRouter {
  private _routes = new Map<string, Middleware>()

  add(name: string, middleware: Middleware) {
    this._routes.set(name, middleware)
  }

  routes(): Middleware {
    return (context: MChannelContext, next: MiddlewareNext) => {
      const middleware = this._routes.get(context.event.name)
      if (!middleware) {
        return next(context)
      }
      return middleware(context, next)
    }
  }
}