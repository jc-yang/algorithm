/**
 * 二维差分
 * acwing798 
 * 798. 差分矩阵

输入一个 n 行 m 列的整数矩阵，再输入 q 个操作，每个操作包含五个整数 x1,y1,x2,y2,c，其中 (x1,y1) 和 (x2,y2) 表示一个子矩阵的左上角坐标和右下角坐标。
每个操作都要将选中的子矩阵中的每个元素的值加上 c。
请你将进行完所有操作后的矩阵输出。

输入格式
第一行包含整数 n,m,q。
接下来 n 行，每行包含 m 个整数，表示整数矩阵。
接下来 q 行，每行包含 5 个整数 x1,y1,x2,y2,c，表示一个操作。

输出格式
共 n 行，每行 m 个整数，表示所有操作进行完毕后的最终矩阵。

数据范围
1≤n,m≤1000,
1≤q≤100000,
1≤x1≤x2≤n,
1≤y1≤y2≤m,
−1000≤c≤1000,
−1000≤矩阵内元素的值≤1000

输入样例：
3 4 3
1 2 2 1
3 2 2 1
1 1 1 1
1 1 2 2 1
1 3 2 3 2
3 1 3 4 1

输出样例：
2 3 4 1
4 3 4 1
2 2 2 2
 */
const readline = require('readline')
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})
const N = 1010
let n, m, q
let inputCount = 0
// 新建二维数组
let arr = new Array(N).fill().map(() => new Array(N).fill(0))
let b = new Array(N).fill().map(() => new Array(N).fill(0))
let aIndex = 0
rl.on('line', line => {
  inputCount++
  if (inputCount === 1) {
    const [nn, mm, qq] = line.split(' ').map(i => parseInt(i))
    n = nn, m = mm, q = qq
  } else if (inputCount <= n + 1) {
    aIndex++
    const l = line.split(' ').map(i => parseInt(i))// 拿到原数组
    for (let i = 1; i <= l.length; i++) {
      arr[aIndex][i] = l[i - 1] // 传给arr，从1开始传
    }
  } else if (inputCount <= q + n + 1) {
    // 拿到所有的原数组后，先构造差分矩阵b
    if (inputCount === n + 2) {
      // 关键操作1
      for (let i = 1; i <= n; i++) {
        for (let j = 1; j <= m; j++) {
          insert(i, j, i, j, arr[i][j])
        }
      }
    }
    // 关键操作2
    // 循环计算结果
    const [x1, y1, x2, y2, c] = line.split(' ').map(i => parseInt(i))
    insert(x1, y1, x2, y2, c)
  }
})

rl.on('close', () => {
  // 关键操作3
  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= m; j++) {
      b[i][j] += b[i][j - 1] + b[i - 1][j] - b[i - 1][j - 1] // 通过求前缀和还原为原数组
    }
  }
  // 输出
  for (let i = 1; i <= n; i++) {
    let res = ''
    for (let j = 1; j <= m; j++) {
      res += b[i][j] + ' '
    }
    console.log(res)
  }
})

function insert(x1, y1, x2, y2, c) {
  b[x1][y1] += c
  b[x1][y2 + 1] -= c
  b[x2 + 1][y1] -= c
  b[x2 + 1][y2 + 1] += c
}