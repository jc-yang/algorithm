package chapter1.baseAlgorithm3;

import javafx.util.Pair;

import java.util.*;

/**
 * acwing802
 * 802. 区间和
 * 假定有一个无限长的数轴，数轴上每个坐标上的数都是 0。
 * 现在，我们首先进行 n 次操作，每次操作将某一位置 x 上的数加 c。
 * 接下来，进行 m 次询问，每个询问包含两个整数 l 和 r，你需要求出在区间 [l,r] 之间的所有数的和。
 *
 * 输入格式
 * 第一行包含两个整数 n 和 m。
 * 接下来 n 行，每行包含两个整数 x 和 c。
 * 再接下来 m 行，每行包含两个整数 l 和 r。
 *
 * 输出格式
 * 共 m 行，每行输出一个询问中所求的区间内数字和。
 * 数据范围
 * −1e9≤x≤1e9,
 * 1≤n,m≤105,
 * −1e9≤l≤r≤1e9,
 * −10000≤c≤10000
 * 输入样例：
 * 3 3
 * 1 2
 * 3 6
 * 7 5
 * 1 3
 * 4 6
 * 7 8
 * 输出样例：
 * 8
 * 0
 * 5
 */
// 数据范围比较小的话可以使用前缀和，但此题数据范围比较大，且比较稀疏（个数少）
public class Y802IntervalSum {
    static final int N = 300010;
    static int[] a = new int[N];
    static int[] s = new int[N];
    static List<Integer> alls = new ArrayList<>(); // 待离散化的数组
    static List<Pair<Integer, Integer>> add = new ArrayList<>();
    static List<Pair<Integer, Integer>> query = new ArrayList<>();
    public static void main(String[] args) {
        Scanner in = new Scanner(System.in);
        int n = in.nextInt();
        int m = in.nextInt();
        for (int i = 0; i < n; i++) {
            int x = in.nextInt();
            int c = in.nextInt();
            add.add(new Pair<>(x, c));
            alls.add(x); // 存下标
        }
        for (int i = 0; i < m; i++) {
            int l = in.nextInt();
            int r = in.nextInt();
            query.add(new Pair<>(l, r));
            // 把左右区间放到待离散化的数组中
            alls.add(l);
            alls.add(r);
        }
        // 排序并去重
        Collections.sort(alls);
        alls = alls.stream().distinct().collect(Collectors.toList());

        // 处理插入
        for (Pair<Integer, Integer> item : add) {
            int x = find(item.getKey());
            a[x] += item.getValue(); // 在离散化之后的坐标的位置上加上要加的数
        }

        // 预处理前缀和
        for (int i = 1; i < alls.size(); i++) {
            s[i] = s[i - 1] + a[i];
        }

        // 处理询问
        for (Pair<Integer, Integer> item : query) {
            int l = find(item.getKey()); // 左边离散化后的结果
            int r = find(item.getValue()); // 右边离散化后的结果
            System.out.println(s[r] - s[l - 1]);
        }
    }

    // 求出x离散化之后的结果
    private static int find(int x) {
        int l = 0, r = alls.size() - 1;
        while (l < r) {
            int mid = l + r >> 1;
            if (alls.get(mid) >= x) {
                r = x;
            } else {
                l = mid + 1;
            }
        }
        return r + 1; // 映射到从1开始的自然数
    }
}
/*
求[L,R]区间内的数字和，相当于这个区间范围内所有的 x 相加
 */