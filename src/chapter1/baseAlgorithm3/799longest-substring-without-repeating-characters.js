const { addAbortSignal } = require("stream");

/**
 * acwing799 leetcode3
 * 799. 最长连续不重复子序列

给定一个长度为 n 的整数序列，请找出最长的不包含重复的数的连续区间，输出它的长度。

输入格式
第一行包含整数 n。
第二行包含 n 个整数（均在 0∼105 范围内），表示整数序列。

输出格式
共一行，包含一个整数，表示最长的不包含重复的数的连续区间的长度。

数据范围
1≤n≤105
输入样例：
5
1 2 2 3 5
输出样例：
3
 */
const readline = require('readline')
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})
let n, a = [], s = new Array(100010).fill(0) // s记录下标为a[i]的数字出现的次数
let inputCount = 0
rl.on('line', line => {
  inputCount++
  if(inputCount === 1) n = parseInt(line)
  else if (inputCount === 2) a = line.split(' ').map(i => parseInt(i))
})

rl.on('close', () => {
  let res = 0
  for(let i = 0, j = 0; i < n; i++) { // j是子串的起点，i是子串的终点
    s[a[i]]++
    while(s[a[i]] > 1) { // 走到当前字符或当前字符有重复
      // 把上一个字符给剔除，到了一个新的子串
      s[a[j]]-- 
      j++
    }
    res = Math.max(res, i - j + 1)
  }
  console.log(res)
})
