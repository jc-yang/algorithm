/**
 * acwing801 leetcode191
 * 801. 二进制中1的个数
给定一个长度为 n 的数列，请你求出数列中每个数的二进制表示中 1 的个数。

输入格式
第一行包含整数 n。
第二行包含 n 个整数，表示整个数列。

输出格式
共一行，包含 n 个整数，其中的第 i 个数表示数列中的第 i 个数的二进制表示中 1 的个数。

数据范围
1≤n≤100000,
0≤数列中元素的值≤109
输入样例：
5
1 2 3 4 5
输出样例：
1 1 2 1 2
 */
const readline = require('readline')
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})
let n, q
let inputCount = 0
rl.on('line', line => {
  inputCount++
  if(inputCount === 1) n = parseInt(line)
  else if(inputCount === 2) q = line.split(' ').map(i => parseInt(i))
})

rl.on('close', () => {
  let output = ''
  q.forEach(x => {
    // 算法内容
    let res = 0
    while(x) {
      x -= lowbit(x) // 每次减去x的最后一位1，减到0为止
      // x &= x - 1 // 或直接把最低位1变为0
      res ++
    }
    output += res + ' '
  });
  console.log(output)
})

// 最低位1，返回最高位为1的二进制数，如 10000
function lowbit(x) {
  return x & -x
}