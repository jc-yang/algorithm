/**
 * acwing795
 * 795. 前缀和
输入一个长度为 n 的整数序列。
接下来再输入 m 个询问，每个询问输入一对 l,r。
对于每个询问，输出原序列中从第 l 个数到第 r 个数的和。

输入格式
第一行包含两个整数 n 和 m。
第二行包含 n 个整数，表示整数数列。
接下来 m 行，每行包含两个整数 l 和 r，表示一个询问的区间范围。

输出格式
共 m 行，每行输出一个询问的结果。

数据范围
1≤l≤r≤n,
1≤n,m≤100000,
−1000≤数列中元素的值≤1000
输入样例：
5 3
2 1 3 6 4
1 2
1 3
2 4
输出样例：
3
6
10
 */
const readline = require('readline')
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

let n = 0, m = 0
let a = []
let inputCount = 0
rl.on('line', (line) => {
  inputCount++
  if (inputCount === 1) {
    const lines = line.split(' ')
    n = parseInt(lines[0])
    m = parseInt(lines[1])
    return
  }
  if (inputCount === 2) {
    const lines = line.split(' ')
    let temp = lines.map(i => parseInt(i)) // 注意是从1开始的
    for(let i = 1; i <= temp.length; i++) a[i] = temp[i - 1]
    return
  }
  if(inputCount <= m + 2) {
    const lines = line.split(' ')
    let l = parseInt(lines[0])
    let r = parseInt(lines[1])
    let res = preSum(a, l, r)
    console.log(res)
  }
})

function preSum(a, l, r) {
  let S = [0]
  for(let i = 1; i <= a.length; i++) { // 下标从1开始
    S[i] = S[i - 1] + a[i] // 前缀和的初始化
  }
  return S[r] - S[l -1] // 区间和的计算
}