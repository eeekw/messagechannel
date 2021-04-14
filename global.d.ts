declare interface Window {
  webkit?: {
    messageChannel?: string
    messageChannelHandler?: (message: any) => void
    messageHandlers: {
      [propName: string]: {
        postMessage: (message: any) => void
      }
    }
  }
}