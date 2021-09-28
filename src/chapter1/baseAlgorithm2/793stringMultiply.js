/**
 * acwing793
 * 
 * 793. 高精度乘法

给定两个非负整数（不含前导 0） A 和 B，请你计算 A×B 的值。

输入格式
共两行，第一行包含整数 A，第二行包含整数 B。

输出格式
共一行，包含 A×B 的值。

数据范围
1≤A的长度≤100000,
0≤B≤10000
输入样例：
2
3
输出样例：
6
 */

const readline = require('readline')
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})
let a = '', b = ''
let A = []
let inputCount = 0
rl.on('line', (line) => {
  inputCount++
  if (inputCount === 1) a = line
  if (inputCount === 2) {
    for (let i = a.length - 1; i >= 0; i--) A.push(parseInt(a.charAt(i))) // a=123 A=[3, 2, 1]
    b = parseInt(line)
  
    let C = stringsMultiply(A, b)

    let res = ''
    for (let i = C.length - 1; i >= 0; i--) res += C[i]
    console.log(res)
  }
})

// C = A * b
function stringsMultiply(A , b) {
  if(!b) return [0] // b = 0
  let C = []
  let t = 0 // 进位
  for(let i = 0; i < A.length || t; i++) { // t不为零则一直运算
    if(i < A.length) t += A[i] * b // 当前位的进位（上一位相乘产生）
    C.push(t % 10) // 存储当前位
    t = parseInt(t / 10)
  }
  return C
}

/**
 * for循环中用 “或” 判断 t !== 0 :
 * 乘法算到大乘数的最高位后，需要将最高位产生的进位继续存入
 * 此时若 i < A.length，则不会产生新的乘法运算进位。计算得该位即为上位的进位，存入即可 。此时的t为两位数
 * 之后t为个位数（因为最后两次运算对同一个t连续除以10了），再 / 10之后必为0，循环退出
 */