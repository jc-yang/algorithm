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
  if (l >= r) return
  let x = q[l], i = l - 1, j = r + 1 // 因为每次都先移动一次指针，所以指针比边界多1个偏移量
  while (i < j) {
    do i++; while (q[i] < x);
    do j--; while (q[j] > x);
    if (i < j) swap(q, i, j)
  }
  quick_sort(q, l, j)
  quick_sort(q, j + 1, r)
}

function swap(q, i, j) {
  let temp = q[i]
  q[i] = q[j]
  q[j] = temp
}

