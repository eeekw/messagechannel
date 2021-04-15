import MessageChannel from "./channel";
import { MChannelEvent } from "./context";

export default class MChannelSession extends MessageChannel {
  
  sessions = new Map<string, MessageChannel>()

  get(name: string): MessageChannel {
    if (!this.sessions.has(name)) {
      let instance = new MessageChannel()
      this.sessions.set(name, instance)
      return instance
    }
    return this.sessions.get(name)!
  }

  call(message: MChannelEvent) {
    const session = message.options["session"]
    if (!session) {
      return
    }

    const channel = this.sessions.get(session)
    if (!channel) {
      return
    }
    channel.add( async (context, next) => {
      await next(context)
      if (!context.callback) {
        return context
      }
      return (context.callback.options["session"] = session, context)
    })
    channel.call(message)
  }
}