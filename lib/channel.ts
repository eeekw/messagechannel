import compose, { MChannelMiddleware, MChannelMiddlewareNext } from "./compose";
import { MChannelContext, MChannelEvent } from "./context";
import MChannelMessage from "./message";

export type Middleware = MChannelMiddleware<MChannelContext>
export type MiddlewareNext = MChannelMiddlewareNext<MChannelContext>

export default class MessageChannel {

  middlewares: Middleware[] = []

  add(fn: Middleware): void {
    this.middlewares.push(fn)
  }

  post(message: MChannelMessage) {
    if (window.webkit?.messageChannel) {
      window.webkit.messageHandlers[window.webkit.messageChannel].postMessage(message)
    }
  }

  async call(message: MChannelEvent) {
    if (!message.name) {
      return
    }
    const context: MChannelContext = {
      event: message,
      callback: message.options["callback"] ?? null
    }
    const fn = compose(this.middlewares)
    try {
      const ctx = await fn(context)
      if (!ctx.callback) {
        return
      }
      this.post(ctx.callback)
    } catch (error) {
      
    }
  }
}