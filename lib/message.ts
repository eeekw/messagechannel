export default class MChannelMessage {
  name: string
  arguments: {
    [propName: string]: any
  }
  options: {
    [propName: string]: any
  }

  constructor(name: string, args = {}, options = {}) {
    this.name = name
    this.arguments = args
    this.options = options
  }
}