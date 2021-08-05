/**
 * JavaScript(V8)方法 不适用于 Node 调用
 */

// while(line = readline()) {
//   let lines = line.split(' ')
//   let a = parseInt(lines[0])
//   let b = parseInt(lines[1])
//   function add(a, b) {
//     return a + b
//   }
//   print(add(a, b))
// }

// 可参考牛客文档https://www.nowcoder.com/discuss/276
/**
 * JavaScript(Node) 方法
 */

// import readline from 'readline'
const readline = require('readline')
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})
// rl.on("line", function () { })就是对每一行的处理，每敲一次回车，就会进入一次这个函数，每次函数的参数都是敲回车前那一行的字符串。
rl.on('line', (line) => {
  let tokens = line.split(' ')
  console.log(parseInt(tokens[0]))
  console.log(parseInt(tokens[1]))
})