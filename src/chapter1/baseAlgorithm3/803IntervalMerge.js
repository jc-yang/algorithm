/**
 * 803. 区间合并
给定 n 个区间 [li,ri]，要求合并所有有交集的区间。
注意如果在端点处相交，也算有交集。
输出合并完成后的区间个数。
例如：[1,3] 和 [2,6] 可以合并为一个区间 [1,6]。

输入格式
第一行包含整数 n。
接下来 n 行，每行包含两个整数 l 和 r。

输出格式
共一行，包含一个整数，表示合并区间完成后的区间个数。

数据范围
1≤n≤100000,
−109≤li≤ri≤109
输入样例：
5
1 2
2 4
5 6
7 8
7 9
输出样例：
3
 */
// 类似贪心

const readline = require('readline')
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})
let inputCount = 0, n = 0
let segs = [] // 保存所有区间
rl.on('line', line => {
  inputCount++
  if(inputCount === 1) n = parseInt(line)
  else if (inputCount <= n + 1) {
    const [left, right] = line.split(' ').map(i => parseInt(i))
    segs.push(new Pair(left, right))
  }
})

rl.on('close', () => {
  merge()
  console.log(segs.length)
})

function merge() {
  let res = []
  // 先将segs按元素区间的左端点排序
  segs.sort((a, b) => {
    return a.left - b.left
  })
  let start = -2e9, end = -2e9 // 题目的区间范围−1e9≤li≤ri≤1e9
  for (let seg of segs) {
    if(end < seg.left) { // 当前维护的区间的右端点在枚举的区间的左边（无交集），则找到了一个新的区间，放进res
      if(start !== -2e9){ // 不能是初始化的区间
        res.push(new Pair(start, end))
      }
      start = seg.left
      end = seg.right
    } else { // 否则两个区间是有交集的，则取并集(取最右端的值)
      end = Math.max(end, seg.right)
    }
  }
  // 循环完后，最后一个区间也要存进去
  if(start !== -2e9) { // 判断一下，防止输入的值没有任何区间的边界情况
    res.push(new Pair(start, end))
  }
  segs = res
}

class Pair{
  constructor(left, right) {
    this.left = left
    this.right = right
  }
}