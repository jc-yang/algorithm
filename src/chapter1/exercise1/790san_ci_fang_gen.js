/**
 * acwing790 leetcode https://leetcode-cn.com/problems/jJ0w9p/
 * 790. 数的三次方根
给定一个浮点数 n，求它的三次方根。

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
rl.on('line', line => {
  let x = parseFloat(line)
  const res = sqrt_cube(x)
  console.log(res.toFixed(6))
})

function sqrt_cube(x) {
  let l = -10000, r = 10000
  while (r - l > 1e-8) { // 经验值，结果精度到6位小数则e-8，比结果多两位
    let mid = (r + l) / 2
    if (mid * mid * mid >= x) {
      r = mid
    } else {
      l = mid
    }
  }
  return l
}