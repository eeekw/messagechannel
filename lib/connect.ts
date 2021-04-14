import MessageChannel from "./channel";
import { MChannelEvent } from "./context";

export default function (channel: MessageChannel) {
  
  if (window.webkit) {
    window.webkit.messageChannelHandler = (message: MChannelEvent) => {
      channel.call(message)
    }
  }
}