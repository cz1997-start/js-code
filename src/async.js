/*
 * async awati执行原理
 * 通过generator自动执行实现
 */

function asyncToGenerator(generatorFunc) {
  return function () {
    const gen = generatorFunc.apply(this, arguments);

    return new Promise((resolve, reject) => {
      function step(key, arg) {
        let generatorResult;
        try {
          generatorResult = gen[key](arg);
        } catch (error) {
          return reject(error);
        }

        const { value, done } = generatorResult;

        if (done) {
          return resolve(value);
        } else {
          return Promise.resolve(value).then(
            function onResolve(val) {
              step("next", val);
            },
            function onReject(err) {
              step("throw", err);
            }
          );
        }
      }
      step("next");
    });
  };
}

const getData = () => new Promise((resolve) => setTimeout(() => resolve("data"), 1000));

// 这样的一个async函数 应该再1秒后打印data
async function test() {
  const data = await getData();
  console.log(data);
  return data;
}

function* testG() {
  // await被编译成了yield
  const data = yield getData();
  console.log("data: ", data);
  const data2 = yield getData();
  console.log("data2: ", data2);
  return data + "123";
}

const testGAsync = asyncToGenerator(testG);
testGAsync().then((result) => {
  console.log(result);
});
