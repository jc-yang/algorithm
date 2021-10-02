/**
 * acwing786
 * 786. 第k个数

给定一个长度为 n 的整数数列，以及一个整数 k，请用快速选择算法求出数列从小到大排序后的第 k 个数。

输入格式
第一行包含两个整数 n 和 k。
第二行包含 n 个整数（所有整数均在 1∼109 范围内），表示整数数列。

输出格式
输出一个整数，表示数列的第 k 小数。

数据范围
1≤n≤100000,
1≤k≤n
输入样例：
5 3
2 4 1 5 3
输出样例：
3
 */

const readline = require('readline')
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})
let n, k, q
let inputCount = 0
rl.on('line', line => {
  inputCount++
  if(inputCount === 1) {
    const [nn, kk] = line.split(' ').map(i => parseInt(i))
    n = nn, k = kk
  } else if(inputCount === 2) {
    q = line.split(' ').map(i => parseInt(i))
  }
})

rl.on('close', () => {
  const res = quick_select(0, n - 1, k)
  console.log(res)
})

function quick_select(l, r, k) {
  if(l === r) return q[l] // 递归时永远保证第k小数永远在区间[l,r]里，所以区间长度为1时该值即为所求
  let x = q[l], i = l - 1, j = r + 1
  while(i < j) {
    while(q[++i] < x);
    while(q[--j] > x);
    if(i < j) swap(q, i, j)
  }
  let sl = j - l + 1 // 左边区间范围是[l,j]，所以区间内元素个数为 j-l+1
  if(k <= sl) {
    return quick_select(l, j, k)
  } else {
    return quick_select(j + 1, r, k - sl)
  }
}

function swap(q, i, j) {
  let temp = q[i]
  q[i] = q[j]
  q[j] = temp
}