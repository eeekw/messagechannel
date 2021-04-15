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

  async process(message: MChannelEvent) {
    if (!message.name) {
      return
    }

    let callback
    const name = message.options["callback"]
    if (name) {
      callback = {
        name,
        arguments: {},
        options: {}
      }
    }
    const context: MChannelContext = {
      event: message,
      callback
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

  call(message: MChannelEvent) {
    this.process(message)
  }
}