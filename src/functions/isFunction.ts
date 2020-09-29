export function isFunction<T>(x: T): T extends Function ? true : false;
export function isFunction<T>(x: T) {
  return !!x && {}.toString.call(x) === "[object Function]";
}
