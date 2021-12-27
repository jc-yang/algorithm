/**
 * 3. 完全背包问题

有 N 种物品和一个容量是 V 的背包，每种物品都有无限件可用。
第 i 种物品的体积是 vi，价值是 wi。

求解将哪些物品装入背包，可使这些物品的总体积不超过背包容量，且总价值最大。
输出最大价值。

输入格式
第一行两个整数，N，V，用空格隔开，分别表示物品种数和背包容积。
接下来有 N 行，每行两个整数 vi,wi，用空格隔开，分别表示第 i 种物品的体积和价值。

输出格式
输出一个整数，表示最大价值。

数据范围
0<N,V≤1000
0<vi,wi≤1000
输入样例
4 5
1 2
2 4
3 4
4 5
输出样例：
10
 */

const readline = require('readline')
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})
/**
 * 朴素dp做法，定义个数k
 * 状态转移方程
 * f[i][j] = f[i-1][j-k*v[i]]+k*w[i]
 */
const N = 1010
let n, m
let v=[0], w  = [0] // 从下标为1开始push
let f = new Array(N)
for(let i = 0; i < N; i++) {
  f[i] = new Array(N).fill(0)
}
let inputCount = 0
rl.on('line', line => {
  inputCount++
  if(inputCount === 1) {
    const [nn, mm] = line.split(' ').map(i => parseInt(i))
    n = nn
    m = mm
  } else {
    const [vv, ww] = line.split(' ').map(i => parseInt(i))
    v.push(vv)
    w.push(ww)
  }
})

rl.on('close', () => {
  for(let i = 1; i <= n; i++) {
    for(let j = 0; j <= m; j++) {
      for(let k = 0; k * v[i] <= j; k++){
        f[i][j] = Math.max(f[i][j], f[i - 1][j - k * v[i]] + k * w[i]) // k从0开始，所以这里包含了f[i-1][j]
      }
    }
  }
  console.log(f[n][m])
})

/**
 * 找规律做优化，去除个数k
 * 注意到，如果将第i个物品进行个数k的枚举：k从0开始
 * f[i,j] = max{ f[i-1][j], f[i-1][j-v]+w, f[i-1][j-2v]+2w, f[i-1][j-3v]+3w, ... }
 * f[i,j-v] = max{          f[i-1][j-v],   f[i-1][j-2v]+w,  f[i-1][j-3v]+2w, ... }
 * 因此，可简写为 f[i][j] = max{ f[i-1][j], f[i,j-v]+w }
 * 
 */
 const N = 1010
 let n, m
 let v=[0], w  = [0] // 从下标为1开始push
 let f = new Array(N)
 for(let i = 0; i < N; i++) {
   f[i] = new Array(N).fill(0)
 }
 let inputCount = 0
 rl.on('line', line => {
   inputCount++
   if(inputCount === 1) {
     const [nn, mm] = line.split(' ').map(i => parseInt(i))
     n = nn
     m = mm
   } else {
     const [vv, ww] = line.split(' ').map(i => parseInt(i))
     v.push(vv)
     w.push(ww)
   }
 })
 
 rl.on('close', () => {
   for(let i = 1; i <= n; i++) {
     for(let j = 0; j <= m; j++) {
        f[i][j] = f[i-1][j]
        if(j >= v[i]) {
            f[i][j] = Math.max(f[i][j], f[i][j-v[i]]+w[i])
        }
     }
   }
   console.log(f[n][m])
 })

 /**
 * 同样做一维优化
 * 
 */
  const N = 1010
  let n, m
  let v=[0], w  = [0] // 从下标为1开始push
  let f = new Array(N).fill(0)
  let inputCount = 0
  rl.on('line', line => {
    inputCount++
    if(inputCount === 1) {
      const [nn, mm] = line.split(' ').map(i => parseInt(i))
      n = nn
      m = mm
    } else {
      const [vv, ww] = line.split(' ').map(i => parseInt(i))
      v.push(vv)
      w.push(ww)
    }
  })
  
  rl.on('close', () => {
    for(let i = 1; i <= n; i++) {
      for(let j = v[i]; j <=m ; j++) {
        f[j] = Math.max(f[j], f[j-v[i]]+w[i]) // 同样优化是要考虑f[j-v[i]]+w[i]代表的是i还是i-1，此处是i所以不用变遍历次序，因为i的已经被算过了，和状态方程是一致的
      }
    }
    console.log(f[m])
  })