/**
 * acwing797差分 leetcode370 区间加法
 * 
 * 797. 差分
输入一个长度为 n 的整数序列。
接下来输入 m 个操作，每个操作包含三个整数 l,r,c，表示将序列中 [l,r] 之间的每个数加上 c。
请你输出进行完所有操作后的序列。

输入格式
第一行包含两个整数 n 和 m。
第二行包含 n 个整数，表示整数序列。
接下来 m 行，每行包含三个整数 l，r，c，表示一个操作。

输出格式
共一行，包含 n 个整数，表示最终序列。

数据范围
1≤n,m≤100000,
1≤l≤r≤n,
−1000≤c≤1000,
−1000≤整数序列中元素的值≤1000
输入样例：
6 3
1 2 2 1 2 1
1 3 1
3 5 1
1 6 1
输出样例：
3 4 5 3 4 2
 */
// acwing797
const readline = require('readline')
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})
let inputCount = 0
let n, m
let a = new Array(100010).fill(0), b = new Array(100010).fill(0)
rl.on('line', line => {
  inputCount++
  if (inputCount === 1) {
    const [nn, mm] = line.split(' ').map(i => parseInt(i))
    n = nn
    m = mm
  } else if (inputCount === 2) {
    const arr = line.split(' ').map(i => parseInt(i))
    for (let i = 1; i <= n; i++) {
      a[i] = arr[i - 1] // 原a数组
    }
    for (let i = 1; i <= n; i++) {
      doInsert(i, i, a[i]) // “构造”差分数组，先把a[i]存进差分数组b[i]去
    }
    // console.log(b)
  } else if (inputCount <= m + 2) {
    const [l, r, c] = line.split(' ').map(i => parseInt(i))
    doInsert(l, r, c) // 求差分

    if (inputCount === m + 2) { // 输入完成，开始计算
      for (let i = 1; i <= n; i++) b[i] += b[i - 1] // 构造出原来的数组
      let res = ''
      for (let i = 1; i <= n; i++) res += b[i] + ' '
      console.log(res)
    }
  }
})

function doInsert(l, r, c) {
  b[l] += c
  b[r + 1] -= c
}

// leetcode 370
function fct(length, updates) {
  let arr = new Array(length).fill(0)
  let b = new Array(length).fill(0)
  // for(let i = 0; i < length; i++) {
  //   insert(i, i, a[i]) // 题目给出数组是全为0，所以不需要进行构造
  // }
  for(let i = 0; i < updates.length; i++) {
    const [l, r, c] = updates[i]
    b[l] += c
    b[r + 1] -= c
  }
  for(let i = 0; i < length; i++) b[i+1] += b[i]
  b.pop()
  return b
}
