// acwing792 leetcode415
/**
 * acwing 792. 高精度减法
 * 给定两个正整数（不含前导 0），计算它们的差，计算结果可能为负数。

输入格式
共两行，每行包含一个整数。

输出格式
共一行，包含所求的差。

数据范围
1≤整数长度≤105
输入样例：
32
11
输出样例：
21
 */

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

    if(isLarger(A, B)) {
      let C = stringsSub(A, B)
      let res = ''
      for (let i = C.length - 1; i >= 0; i--) res += C[i]
      console.log(res)
    } else {
      let C = stringsSub(B, A)
      let res = ''
      for (let i = C.length - 1; i >= 0; i--) res += C[i]
      console.log('-' + res)
    }

  }
})

// C = A - B
// 此时传参应保证 A >= B
function stringsSub(A = [], B = []) {
  let C = [] // 结果
  let t = 0 // 借位
  for(let i = 0; i < A.length; i++) {
    t = A[i] - t; 
    if(i < B.length) t -= B[i] // t保存的是借位以及两数相减的结果：A[i] - B[i] - 借位
    C.push(parseInt((t + 10) % 10)) // (t + 10) % 10保证了两种情况。t>=0，就是t本身；t<0，就要取t+10后的值（向高位借过来的10）
    if(t < 0) t = 1 // 计算结果<0，则需要向高位借1
    else t = 0
  }
  while(C.length > 1 && C[C.length - 1] === 0) { // 删除高位的0
    C.pop()
  }
  return C
}

// 是否大于
function isLarger(A, B) {
  if(A.length !== B.length) return A.length >= B.length // 先判断位数
  for(let i = A.length - 1; i >= 0; i--) { // 若位数相同，则从高位向低位依次判断，在数值不相等处判断即可
    if(A[i] !== B[i]) {
      return A[i] > B[i]
    }
  }
  return true
}