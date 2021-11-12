/**
 * 826. 单链表

实现一个单链表，链表初始为空，支持三种操作：
向链表头插入一个数；
删除第 k 个插入的数后面的数；
在第 k 个插入的数后插入一个数。
现在要对该链表进行 M 次操作，进行完所有操作后，从头到尾输出整个链表。
注意:题目中第 k 个插入的数并不是指当前链表的第 k 个数。例如操作过程中一共插入了 n 个数，则按照插入的时间顺序，这 n 个数依次为：第 1 个插入的数，第 2 个插入的数，…第 n 个插入的数。

输入格式
第一行包含整数 M，表示操作次数。
接下来 M 行，每行包含一个操作命令，操作命令可能为以下几种：
H x，表示向链表头插入一个数 x。
D k，表示删除第 k 个插入的数后面的数（当 k 为 0 时，表示删除头结点）。
I k x，表示在第 k 个插入的数后面插入一个数 x（此操作中 k 均大于 0）。

输出格式
共一行，将整个链表从头到尾输出。

数据范围
1≤M≤100000
所有操作保证合法。

输入样例：
10
H 9
I 1 1
D 1
D 0
H 6
I 3 6
I 4 5
I 4 5
I 3 4
D 6

输出样例：
6 4 6 5
 */

const N = 100010
// head 表示头结点的下标
// e[i] 表示节点 i 的值
// ne[i] 表示节点 i 的下一个节点的下标
// idx 存储当前已经用到了哪个点（下标）
let head, e = new Array(N).fill(0), ne = new Array(N).fill(0), idx
// 初始化
function init(params) {
  head = -1
  idx = 0
}

// 将x插入到头结点
function add_to_head(x) {
  e[idx] = x // 存当前节点
  ne[idx] = head // 当前节点next指向原链表的head （栓新绳）
  head = idx // head变为当前节点的下标 （解旧绳）
  idx++  // 指向下一节点
}

// 将x节点插入到下标为k的节点的后面
function add(k, x) {
  e[idx] = x
  ne[idx] = ne[k] // 当前节点的next指向原链表k指向的next
  ne[k] = idx // 原链表k指向的next指向当前节点
  idx++
}

// 将下标k后面的节点删除
function remove(k) {
  ne[k] = ne[ne[k]]
}

const readline = require('readline')
const rl = readline.createInterface({
  input: process.stdin,
  output: process.output
})
let inputCount = 0, m
init()
rl.on('line', line => {
  inputCount++
  if(inputCount === 1) m = parseInt(line)
  else if (inputCount <= m + 1) {
    const lll = line.split(' ')
    const op = lll[0]
    if (op === 'H') {
      const x = parseInt(lll[1])
      add_to_head(x)
    } else if (op === 'D') {
      const k = parseInt(lll[1])
      if (!k) head = ne[head]
      else remove(k - 1) // 0号点是第一个插入的点，1是第二个插入的点，所以输入需要是k-1
    } else {
      const k = parseInt(lll[1])
      const x = parseInt(lll[2])
      add(k - 1, x)
    }
  }
})
rl.on('close', () => {
  let res = ''
  for(let i = head; i !== -1; i = ne[i]) {
    res += e[i] + ' '
  }
  console.log(res)
})