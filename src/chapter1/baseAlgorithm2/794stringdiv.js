/**
 * acwing 794
 * 794. 高精度除法
给定两个非负整数（不含前导 0） A，B，请你计算 A/B 的商和余数。

输入格式
共两行，第一行包含整数 A，第二行包含整数 B。

输出格式
共两行，第一行输出所求的商，第二行输出所求余数。

数据范围
1≤A的长度≤100000,
1≤B≤10000,
B 一定不为 0
输入样例：
7
2
输出样例：
3
1
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

    let [C, r] = stringsDiv(A, b)

    let res = ''
    for (let i = C.length - 1; i >= 0; i--) res += C[i]
    console.log(res)
    console.log(r)
  }
})

// A / b = C ··· r，商为C，余数为r
function stringsDiv(A, b) {
  let C = []
  r = 0
  for(let i = A.length - 1; i >= 0; i--) { // 从高位计算
    r = r * 10 + A[i] // 竖式计算中，当前位余数：把除数上一位位算得的余数与除数当前位组合（10进制append）
    C.push(parseInt(r / b)) // 计算当前位的商
    r %= b // 下一位余数的前置部分
  }
  C = C.reverse() // 题目输出的时候是倒序，所以这里reverse一下
  while(C.length > 1 && C[C.length - 1] === 0) C.pop() // 去除前导0
  return [C, r]
}