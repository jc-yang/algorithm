/*
830. 单调栈

给定一个长度为 N 的整数数列，输出每个数左边第一个比它小的数，如果不存在则输出 −1。

输入格式
第一行包含整数 N，表示数列长度。
第二行包含 N 个整数，表示整数数列。

输出格式
共一行，包含 N 个整数，其中第 i 个数表示第 i 个数的左边第一个比它小的数，如果不存在则输出 −1。

数据范围
1≤N≤105
1≤数列中元素≤109
输入样例：
5
3 4 2 7 5
输出样例：
-1 3 -1 2 2
 */

const readline = require('readline')
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})
let inputCount = 0
let n, q
rl.on('line', line => {
    inputCount++
    if(inputCount === 1) n = parseInt(line)
    else q = line.trim().split(' ').map(i => parseInt(i))
})
const N = 100010
let stack = new Array(N).fill(0), tt = 0
rl.on('close', () => {
    let res = ''
    q.forEach(x => {
        // 计算题目内容
        while (tt && stack[tt] >= x) { // 栈顶元素就永远不会被用到
            tt-- // 所以指针指向下一个
        }
        if (tt) res += stack[tt] + ' ' // 单调栈减完之后如果tt不为0(栈不为空)，则栈顶元素就是离x左边最近最小的数
        else res += '-1 ' // 否则栈为空，没有要求的数

        stack[++tt] = x // 最后记得要把x插到栈里面去
    })
    console.log(res)
})
