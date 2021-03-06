function myApply(context, ...args) {
  context = context || window;
  context.fn = this;
  let res = context.fn([...args]);
  delete fn;
  return res;
}

Function.prototype.myApply = myApply;

let obj = {
  name: "tom",
  getName() {
    console.log(this.name);
  },
};
var name = "jack";

function getName() {
  console.log(this.name);
}

obj.getName.myApply();
