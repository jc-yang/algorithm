package chapter2.dataStructure1;

import java.util.Scanner;

public class Y826singleLinkedList {
    public static final int N = 100010;
    // head 表示头结点的下标
    // e[i] 表示节点 i 的值
    // ne[i] 表示节点 i 的下一个节点的下标
    // idx 存储当前已经用到了哪个点（下标）
    public static int head, idx;
    public static int[] e = new int[N], ne = new int[N];

    // 初始化
    public static void init() {
        head = -1;
        idx = 0;
    }

    // 将x插入头节点
    public static void add_to_head(int x) {
        e[idx] = x;
        ne[idx] = head;
        head = idx;
        idx++;
    }

    // 将x节点插入到下标为k的节点的后面
    public static void add(int k, int x) {
        e[idx] = x;
        ne[idx] = ne[k];
        ne[k] = idx;
        idx++;
    }

    // 将下标k后面的节点删除
    public static void remove(int k) {
        ne[k] = ne[ne[k]];
    }

    public static void main(String[] args) {
        Scanner in = new Scanner(System.in);
        int m = in.nextInt();
        init();
        for (int i = 0; i < m; i++) {
            String op = in.next();
            int k, x;
            if (op.equals("H")) {
                x = in.nextInt();
                add_to_head(x);
            } else if (op.equals("D")) {
                k = in.nextInt();
                if (k == 0) {
                    head = ne[head]; // 删除头结点
                } else {
                    remove(k - 1); // 0号点是第一个插入的点，1是第二个插入的点，所以输入需要是k-1
                }
            } else {
                k = in.nextInt();
                x = in.nextInt();
                add(k - 1, x);
            }
        }

        for (int i = head; i != -1; i = ne[i]){
            System.out.print(e[i] + " ");
        }
    }
}
