import MessageChannel from "./channel";

export default function (channel: MessageChannel) {
  
  if (window.webkit) {
    window.webkit.messageChannelHandler = (message: any) => {
      channel.call(message)
    }
  }
}