function curry(fn, args) {
  args = args || [];
  return function (...nextArgs) {
    args = [...args, ...nextArgs];
    if (nextArgs.length === 0) {
      return fn.apply(this, args);
    }
    return curry.call(this, fn, args);
  };
}
var fn = curry(function (...arg) {
  return arg.reduce((a, b) => a + b);
});
