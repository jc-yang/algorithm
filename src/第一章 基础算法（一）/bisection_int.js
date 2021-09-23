/**
 * 整数二分
 * 789. 数的范围
给定一个按照升序排列的长度为 n 的整数数组，以及 q 个查询。

对于每个查询，返回一个元素 k 的起始位置和终止位置（位置从 0 开始计数）。

如果数组中不存在该元素，则返回 -1 -1。

输入格式
第一行包含整数 n 和 q，表示数组长度和询问个数。

第二行包含 n 个整数（均在 1∼10000 范围内），表示完整数组。

接下来 q 行，每行包含一个整数 k，表示一个询问元素。

输出格式
共 q 行，每行包含两个整数，表示所求元素的起始位置和终止位置。

如果数组中不存在该元素，则返回 -1 -1。

数据范围
1≤n≤100000
1≤q≤10000
1≤k≤10000
输入样例：
6 3
1 2 2 3 3 4
3
4
5
输出样例：
3 4
5 5
-1 -1
 */


const readline = require('readline')
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

let n = 0, q = 0, arr = []
let inputCount = 0
rl.on('line', (line) => {
  inputCount++
  if (inputCount === 1) {
    let line1 = line.split(' ')
    n = parseInt(line1[0])
    q = parseInt(line1[1])
  } else if (inputCount === 2) {
    arr = line.split(' ').map(i => parseInt(i))
  } else if (inputCount <= q + 2) { // 第三行往后
    let x = parseInt(line)
    let res = bisection(arr, n, x)
    console.log(res)
  }
})

/**
 * 
 * @param {数组} arr 
 * @param {数组长度} n 
 * @param {需要查询的数} x 
 */
function bisection(arr, n, x) {
  let l = 0, r = n - 1
  while (l < r) {
    let mid = l + r >> 1
    if (arr[mid] >= x) {
      r = mid
    } else {
      l = mid + 1
    }
  }
  if (arr[l] != x) { // 不存在这个数
    return '-1 -1'
  } else {
    let res = l + ' ' // 先输出 l 或 r，循环结束后两者相同，所以输出哪一个无所谓
    l = 0, r = n - 1
    while (l < r) {
      let mid = l + r + 1 >> 1 // 因为是 l=mid，所以 l + r 要 +1
      if (arr[mid] <= x) {
        l = mid
      } else {
        r = mid - 1
      }
    }
    res += l
    return res
  }
}