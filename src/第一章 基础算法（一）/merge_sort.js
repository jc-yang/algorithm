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
  if(inputCount === 1) n = parseInt(line)
  if(inputCount === 2) {
    q = line.split(' ').map(i => parseInt(i))

    merge_sort(q, 0, n - 1)

    let res = ''
    q.forEach(i => res += i + ' ')
    console.log(res)
  }
})

let temp = [] // 归并排序需要额外开辟空间来存储排序结果
function merge_sort(q, l, r) {
  if(l >= r) return
  let mid = Math.round((l + r) >> 1) // 取中间点

  // 递归，使两个小区间有序
  merge_sort(q, l, mid)
  merge_sort(q, mid + 1, r)

  // 归并
  // k:temp里已经有多少个数了(已经合并了多少个数了)； i 和 j 为双指针，把小的放到 temp 中
  let k = 0, i = l, j = mid + 1
  while(i <= mid && j <= r) {
    if(q[i] <= q[j]) {
      temp[k ++] = q[i ++]
    } else {
      temp[k ++] = q[j ++]
    }
  }
  // 到此可能有区间没有循环完，那判断一下 append 到 temp 里即可
  while(i <= mid) temp[k ++] = q[i ++]
  while(j <= r) temp[k ++] = q[j ++]
  // 将 temp 复制给原数组 q
  for(i = l, j = 0; i <= r; i++, j++) q[i] = temp[j] // 注意从l开始，到r结束
}