export type MChannelMiddleware<T> = (context: T, next: MChannelMiddlewareNext<T>) => Promise<T> | T
export type MChannelMiddlewareNext<T> = (context: T) => Promise<T>

export default function compose<T extends any = any>(fns: MChannelMiddleware<T>[]) {
  return function (context:T) {
    
    let index = -1
    return dispatch(0, context)
    function dispatch(i: number, context: T): Promise<T> {
      if (index == i) {
        return Promise.reject(new Error('next() called multiple times'))
      }

      index = i

      const fn = fns[i]
      if (!fn) {
        return Promise.resolve(context)
      }
      try {
        return Promise.resolve(fn(context, context => dispatch(i + 1, context)))
      } catch (error) {
        return Promise.reject(error)
      }
    }
  }
}