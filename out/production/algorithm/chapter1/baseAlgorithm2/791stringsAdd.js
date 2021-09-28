// acwing791 leetcode415
const readline = require('readline')
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})
let a = '', b = ''
let A = [], B = []
let inputCount = 0
rl.on('line', (line) => {
  inputCount++
  if (inputCount === 1) a = line
  if (inputCount === 2) {
    b = line
    for (let i = a.length - 1; i >= 0; i--) A.push(parseInt(a.charAt(i))) // a=123 A=[3, 2, 1]
    for (let i = b.length - 1; i >= 0; i--) B.push(parseInt(b.charAt(i)))
    let C = highPrecisionAdd(A, B)
    let res = ''
    for (let i = C.length - 1; i >= 0; i--) res += C[i]
    console.log(res)
  }
})

// C = A + B
function highPrecisionAdd(A = [], B = []) {
  let C = [] // 结果
  let t = 0 // 进位
  // 从个位开始计算
  for (let i = 0; i < A.length || i < B.length; i++) {
    if (i < A.length) t += A[i]
    if (i < B.length) t += B[i] // 此时 t = A[i] + B[i] + t0， t0是上一位的进位
    C.push(t % 10) // 取模，存当前位
    t = parseInt(t / 10) // 求商，存进位(js需要取整)
  }
  if (t) C.push(1) // 如果最高位还有进位，存个1
  return C
}