// Node.js v14.18.0 和 v16.0.0 及以上
const assert = require('node:assert/strict')
const { SyntheticModule } = require('node:vm')

function add(...args) {
  // 技巧 - 使用rest，直接在内部使用arguments，arguments是类数组，需要Array.from(argument)
  // 技巧 - reduce直接计算
  return args.reduce((total, item) => total + item, 0)
}

function testAdd() {
  // (真实值actual, 期望值expected)
  assert.deepEqual(add(), 0)
  assert.deepEqual(add(1), 1)
  assert.deepEqual(add(1, 2, 3), 6)
  // assert.deepEqual(add(1, 2, 3, 4), 100)
}

function testStrictDiff() {
  // assert.deepEqual([[[1, 2, 3]], 4, 5], [[[1, 2, '3']], 4, 5]);
  assert.deepEqual({ a: 1 }, { a: 2 })
}

function testUseApi() {
  assert(true) // 等同于assert.ok(true)
  assert.fail([message]) // 抛出错误，message若为Error实例，抛出的错误就是Error不是AssertionError
}

function runTest() {
  try {
    testAdd()
    testStrictDiff()
    testUseApi()
    console.log('testAdd 测试通过')
  } catch (err) {
    console.log(`testAdd 测试失败 ${err.message}`)
  }
}

runTest()

// 严格模式和非严格模式
// ### 启用
// require('node:assert/strict')
// require('node:assert')
// 严格模式下，deepEqual等同于deepStrictEqual，就是不会做格式转化
// ### 错误消息显示区别
// assert.deepEqual({ a: 1 }, { a: 2 })
// 严格模式会显示diff{+ a:1 - a:2}
// 非严格模式显示对象{a:1} should loosely deep-equal {a:2}
