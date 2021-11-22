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
    else q = line.split(' ').map(i => parseInt(i))
})

rl.on('close', () => {
    let res = '-1 '
    for(let i = 1; i < q.length; i++) {
        for(let j = i - 1; j >= 0; j++) {
            if(q[j] < q[i] ) {
                res += q[j]
                console.log(res)
            }
        }
    }
    console.log(q)
})
