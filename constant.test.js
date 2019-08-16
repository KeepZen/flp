const constant = require('./constant');
test("imute(obj)", () => {
  let obj = { a: 1, b: 2 }
  obj.add_a_and_b = function () {
    return this.c = this.a + this.b;
  }
  let objc = constant(obj);
  objc.a++;
  expect(obj.a).toBe(1);
  delete objc.a;
  expect(obj.a).toBe(1);
  objc.add_a_and_b();
  expect(objc.c).toBe(undefined);
  objc.newProperty = 1;
  expect(objc.newProperty).toBe(undefined);
  expect(objc.add_a_and_b()).toBe(3);
});
