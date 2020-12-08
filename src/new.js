function myNew(Constructor, ...args) {
  let obj = Object.create(Constructor.proptotype);
  let result = Constructor.apply(obj, args);
  return typeof result === "object" ? result : obj;
}
