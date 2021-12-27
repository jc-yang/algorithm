/**
 * 2. 01背包问题

有 N 件物品和一个容量是 V 的背包。每件物品只能使用一次。
第 i 件物品的体积是 vi，价值是 wi。

求解将哪些物品装入背包，可使这些物品的总体积不超过背包容量，且总价值最大。
输出最大价值。

输入格式
第一行两个整数，N，V，用空格隔开，分别表示物品数量和背包容积。
接下来有 N 行，每行两个整数 vi,wi，用空格隔开，分别表示第 i 件物品的体积和价值。

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
8
 */

const readline = require('readline')
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})
/**
 * 二维朴素做法
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
      if(j >= v[i]) { // 否则包含i的情况是不存在的，也就是加上i体积就超过j了
        f[i][j] = Math.max(f[i][j], f[i-1][j-v[i]]+w[i])
      }
    }
  }
  console.log(f[n][m])
})

/**
 * 一维优化做法
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
     for(let j =  m; j >= v[i]; j--) { 
         // 倒序，可以在计算f[j]时使其还没有被更新过，否则f[j-v[i]]+w[i]代表的其实是i的值f[i][j-v[i]]+w[i]而非f[i-1][j-v[i]]+w[i]
         f[j] = Math.max(f[j], f[j-v[i]]+w[i])
     }
   }
   console.log(f[m])
 })