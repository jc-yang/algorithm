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
  if (!n) n = parseInt(line)
  if (inputCount === 2) {
    q = line.split(' ').map(i => parseInt(i))

    quick_sort(q, 0, n - 1)

    let res = ''
    q.forEach(i => res += i + ' ')
    console.log(res)
  }

})

function quick_sort(q, l, r) {
  if (l >= r) return // 区间里个数是 1 或 0 则退出
  let x = q[l], i = l - 1, j = r + 1 // 因为每次都先移动一次指针，所以指针比边界多1个偏移量
  while (i < j) {
    do i++; while (q[i] < x);
    do j--; while (q[j] > x);
    if (i < j) swap(q, i, j)
  } // 循环交换完后，x左侧都比x小，右侧都比x大，之后分别排序左右两个区间
  quick_sort(q, l, j) // 思考下为什么是 j
  quick_sort(q, j + 1, r)
}

/**
 * 思考为什么是 j：
 * i 和 j 均可以用于分割区间，只是需要完全对称，如：
 *   quick_sort(q, l, j) 
 *   quick_sort(q, j + 1, r)
 * 或者
 *   quick_sort(q, l, i - 1) 
 *   quick_sort(q, i, r)
 * 此时须特别注意边界问题，以 j 分割时，起点 x=q[l]不会有问题
 * 但如果以 i 分割，起点 x=q[l] 会引起数组越界进入死循环，改为 x=q[r] 即可
 * 或者将起点设置为中心 x=q[Math.round((l + r) / 2)]，则不会涉及到边界问题
 * 
 * 为什么进入死循环：
 * 以数组[1, 2]为例，x=1 循环完毕进入递归后, 会一直在区间[0, 1]中递归，进入死循环
 */

function swap(q, i, j) {
  let temp = q[i]
  q[i] = q[j]
  q[j] = temp
}

