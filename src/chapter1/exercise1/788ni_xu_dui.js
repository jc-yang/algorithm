/**
 * acwing788, leetcode https://leetcode-cn.com/problems/shu-zu-zhong-de-ni-xu-dui-lcof/comments/
 * 788. 逆序对的数量

给定一个长度为 n 的整数数列，请你计算数列中的逆序对的数量。
逆序对的定义如下：对于数列的第 i 个和第 j 个元素，如果满足 i<j 且 a[i]>a[j]，则其为一个逆序对；否则不是。

输入格式
第一行包含整数 n，表示数列的长度。
第二行包含 n 个整数，表示整个数列。

输出格式
输出一个整数，表示逆序对的个数。

数据范围
1≤n≤100000，
数列中的元素的取值范围 [1,109]。

输入样例：
6
2 3 4 5 6 1
输出样例：
5
 */

const readline = require('readline')
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

let n = 0
let q = []
let inputCount = 0
rl.on('line', (line) => {
  inputCount++
  if (inputCount === 1) n = parseInt(line)
  if (inputCount === 2) {
    q = line.split(' ').map(i => parseInt(i))
  }
})

rl.on('close', () => {
  let res = merge_count(q, 0, n - 1)
  console.log(res)
})

let temp = [] // 归并排序需要额外开辟空间来存储排序结果
function merge_count(q, l, r) {
  if (l >= r) return 0
  let mid = Math.round((l + r) >> 1) // 取中间点

  // 递归，使两个小区间有序
  let res = merge_count(q, l, mid) + merge_count(q, mid + 1, r) // 整个区间逆序对的数量就是两个子区间数量的和

  // 归并
  // k:temp里已经有多少个数了(已经合并了多少个数了)； i 和 j 为双指针，把小的放到 temp 中
  let k = 0, i = l, j = mid + 1
  while (i <= mid && j <= r) {
    if (q[i] <= q[j]) {
      temp[k++] = q[i++]
    } else { // 否则 q[i] 和 q[j] 就构成逆序对
      temp[k++] = q[j++]
      res += mid - i + 1 // 区间[i, mid]内的数都与q[j]构成逆序对，所以加上他们的数量即可，不需要再循环这个区间
      // 因为此时左区间里的q[i] > 右区间里的q[j]，所以左区间里的[i, mid]都 大于 q[j]，所以也和q[j]构成逆序对
    }
  }
  // 扫尾
  while (i <= mid) temp[k++] = q[i++]
  while (j <= r) temp[k++] = q[j++]
  // 物归原主
  for (let i = l, j = 0; i <= r; i++, j++) q[i] = temp[j] // 注意从l开始，到r结束
  return res
}