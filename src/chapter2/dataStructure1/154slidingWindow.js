/**
 * 滑动窗口求窗口内极值，也就是单调队列
 * 
 * 154. 滑动窗口
给定一个大小为 n≤106 的数组。
有一个大小为 k 的滑动窗口，它从数组的最左边移动到最右边。
你只能在窗口中看到 k 个数字。
每次滑动窗口向右移动一个位置。

以下是一个例子：
该数组为 [1 3 -1 -3 5 3 6 7]，k 为 3。

窗口位置	               最小值	最大值
[1 3 -1] -3 5 3 6 7	        -1	      3
1 [3 -1 -3] 5 3 6 7	        -3	      3
1 3 [-1 -3 5] 3 6 7	        -3	      5
1 3 -1 [-3 5 3] 6 7	        -3	      5
1 3 -1 -3 [5 3 6] 7      	 3	      6
1 3 -1 -3 5 [3 6 7]	         3	      7
你的任务是确定滑动窗口位于每个位置时，窗口中的最大值和最小值。

输入格式
输入包含两行。

第一行包含两个整数 n 和 k，分别代表数组长度和滑动窗口的长度。

第二行有 n 个整数，代表数组的具体数值。

同行数据之间用空格隔开。

输出格式
输出包含两个。

第一行输出，从左至右，每个位置滑动窗口中的最小值。
第二行输出，从左至右，每个位置滑动窗口中的最大值。

输入样例：
8 3
1 3 -1 -3 5 3 6 7
输出样例：
-1 -3 -3 -3 3 3
3 3 5 5 6 7
 */

const readline = require('readline')
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})
let n, k, a
let inputCount = 0
rl.on('line', line => {
  inputCount++
  if(inputCount === 1) {
    const [nn, kk] = line.split(' ')
    n = nn, k =kk
  } else {
    a = line.split(' ').map(i => parseInt(i))
  }
})
let q = [] // 队列，里面存下标
rl.on('close', () => {
  let res = ''
  for(let i = 0; i < a.length; i++) {
    // 构建滑动窗口，判断队头是否已经滑出了窗口
    // 每次只滑动一个，所以用if
    if(q.length > 0 && i-k+1 > q[0]) { // 要出队的元素的下标如果是比队头大，说明已经出了窗口了
      q.shift() // 出队
    }
    // 构建单调队列，单调增
    while(q.length > 0 && a[q[q.length-1]] > a[i]) { // 如果队尾所指的元素比当前元素大，则删除队尾元素
      q.pop()
    }
    // 入队
    q.push(i)
    // 从第k个开始输出
    if(i >= k - 1) {
      res += a[q[0]] + ' '
    }
  }
  console.log(res)
  res = '', q = []
  for(let i = 0; i < a.length; i++) {
    // 构建滑动窗口，判断队头是否已经滑出了窗口
    if(q.length > 0 && i-k+1 > q[0]) { // 要出队的元素的下标如果是比队头大，说明已经出了窗口了
      q.shift() // 出队
    }
    // 构建单调队列，单调减
    while(q.length > 0 && a[q[q.length-1]] < a[i]) { // 如果队尾所指的元素比当前元素小，则删除队尾元素
      q.pop()
    }
    // 入队
    q.push(i)
    // 从第k个开始输出
    if(i >= k - 1) {
      res += a[q[0]] + ' '
    }
  }
  console.log(res)
})