/**
 * 浮点数二分
 * 790. 数的三次方根
 * 给定一个浮点数 n，求它的三次方根。

输入格式
共一行，包含一个浮点数 n。

输出格式
共一行，包含一个浮点数，表示问题的解。

注意，结果保留 6 位小数。

数据范围
−10000≤n≤10000
输入样例：
1000.00
输出样例：
10.000000
 */

const readline = require('readline')
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

rl.on('line', (line) => {
  let x = parseFloat(line)
  let res = bisection(x)
  console.log(res.toFixed(6))
})


function bisection(x) {
  let l = -100, r = 100 // 根据题目上数的范围得到的
  while (r - l > 1e-8) { // 二者差距够小后认为二者相等，经验值，至少要比结果的精度多两个数量级
    let mid = (l + r) / 2
    if (mid * mid * mid >= x) {
      r = mid
    } else {
      l = mid
    }
  }
  return l
}