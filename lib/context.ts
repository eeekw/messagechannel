import MChannelMessage from "./message";

export interface MChannelEvent extends MChannelMessage {}
export interface MChannelCallback extends MChannelMessage {}

export interface MChannelContext {
  event: MChannelEvent
  callback?: MChannelCallback
}