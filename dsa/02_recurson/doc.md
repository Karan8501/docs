# Recursion Patterns Cheat Sheet (Complete)

This document contains comprehensive recursive patterns commonly used in problem-solving, data structures, algorithms, and competitive programming. Each pattern includes explanations, use cases, and example code.

---

## 1. Linear Recursion

**Pattern:** One recursive call at each level.

```cpp
void print(int n) {
    if (n == 0) return;
    print(n - 1);
    cout << n << " ";
}
```

**Use Cases:**

* Printing numbers
* Factorial
* Basic operations on integers

---

## 2. Tail Recursion

**Pattern:** Recursive call is the last operation.

```cpp
void tailRec(int n, int result = 1) {
    if (n == 0) {
        cout << result;
        return;
    }
    tailRec(n - 1, result * n);
}
```

**Use Cases:**

* Factorial
* Sum of natural numbers

---

## 3. Tree Recursion

**Pattern:** Multiple recursive calls at each level.

```cpp
int fib(int n) {
    if (n <= 1) return n;
    return fib(n - 1) + fib(n - 2);
}
```

**Use Cases:**

* Fibonacci
* Combinatorics
* Decision problems

---

## 4. Pick / Not Pick (Subset Pattern)

**Pattern:** Choose or skip the current element.

```cpp
void subset(int i, vector<int>& arr, vector<int>& temp) {
    if (i == arr.size()) {
        // process temp
        return;
    }
    temp.push_back(arr[i]);
    subset(i + 1, arr, temp);
    temp.pop_back();
    subset(i + 1, arr, temp);
}
```

**Use Cases:**

* Generate all subsets
* Subset sum
* K-subset combinations

---

## 5. Backtracking with Loop (Combinations)

**Pattern:** Use a loop in recursion.

```cpp
void combine(int start, vector<int>& arr, vector<int>& temp) {
    for (int i = start; i < arr.size(); i++) {
        temp.push_back(arr[i]);
        combine(i + 1, arr, temp);
        temp.pop_back();
    }
}
```

**Use Cases:**

* Combinations
* Palindromic partitioning
* N-Queens

---

## 6. Permutation (Swapping)

**Pattern:** Swap and recurse.

```cpp
void permute(int i, vector<int>& arr) {
    if (i == arr.size()) {
        // process arr
        return;
    }
    for (int j = i; j < arr.size(); j++) {
        swap(arr[i], arr[j]);
        permute(i + 1, arr);
        swap(arr[i], arr[j]);
    }
}
```

**Use Cases:**

* All permutations
* Anagrams
* String rearrangement

---

## 7. Unique Permutations with Frequency Map

**Pattern:** Use a map or counter to avoid duplicates.

```cpp
void permute(map<char, int>& freq, string& curr, int len) {
    if (curr.length() == len) {
        cout << curr << endl;
        return;
    }
    for (auto& [ch, count] : freq) {
        if (count > 0) {
            curr.push_back(ch);
            freq[ch]--;
            permute(freq, curr, len);
            freq[ch]++;
            curr.pop_back();
        }
    }
}
```

**Use Cases:**

* Unique permutations
* Word scramble solver

---

## 8. Memoization (Top-Down DP)

**Pattern:** Cache intermediate results.

```cpp
int fib(int n, vector<int>& dp) {
    if (n <= 1) return n;
    if (dp[n] != -1) return dp[n];
    return dp[n] = fib(n - 1, dp) + fib(n - 2, dp);
}
```

**Use Cases:**

* Fibonacci
* Climbing stairs
* Grid paths

---

## 9. Tabulation (Bottom-Up DP)

**Pattern:** Iteratively build up the solution.

```cpp
int fib(int n) {
    vector<int> dp(n + 1);
    dp[0] = 0; dp[1] = 1;
    for (int i = 2; i <= n; ++i)
        dp[i] = dp[i-1] + dp[i-2];
    return dp[n];
}
```

---

## 10. DFS on Grid (4-Directional)

```cpp
void dfs(int i, int j, vector<vector<int>>& grid) {
    if (i < 0 || j < 0 || i >= grid.size() || j >= grid[0].size()) return;
    if (grid[i][j] != 1) return;

    grid[i][j] = -1;
    dfs(i+1, j, grid);
    dfs(i-1, j, grid);
    dfs(i, j+1, grid);
    dfs(i, j-1, grid);
}
```

**Use Cases:**

* Flood fill
* Count islands
* Pathfinding

---

## 11. DFS on Graph

```cpp
void dfs(int node, vector<int> adj[], vector<bool>& visited) {
    visited[node] = true;
    for (int neighbor : adj[node]) {
        if (!visited[neighbor])
            dfs(neighbor, adj, visited);
    }
}
```

**Use Cases:**

* Connected components
* Graph traversal
* Cycle detection

---

## 12. Binary Search (Recursive)

```cpp
int binarySearch(vector<int>& arr, int low, int high, int target) {
    if (low > high) return -1;
    int mid = low + (high - low) / 2;
    if (arr[mid] == target) return mid;
    if (arr[mid] > target) return binarySearch(arr, low, mid - 1, target);
    return binarySearch(arr, mid + 1, high, target);
}
```

**Use Cases:**

* Sorted arrays
* Rotated search
* First/Last occurrence

---

## 13. Expression Building / Letter Case

```cpp
void generate(string s, int i, string curr) {
    if (i == s.size()) {
        cout << curr << endl;
        return;
    }

    generate(s, i + 1, curr + tolower(s[i]));
    if (isalpha(s[i]))
        generate(s, i + 1, curr + toupper(s[i]));
}
```

**Use Cases:**

* Letter case permutations
* Expression evaluation
* Password generation

---

## 14. Combination Sum / Pruning

```cpp
void findComb(int i, int sum, vector<int>& arr, vector<int>& ds, vector<vector<int>>& ans) {
    if (sum == 0) {
        ans.push_back(ds);
        return;
    }
    if (i == arr.size() || sum < 0) return;

    ds.push_back(arr[i]);
    findComb(i, sum - arr[i], arr, ds, ans);
    ds.pop_back();
    findComb(i + 1, sum, arr, ds, ans);
}
```

**Use Cases:**

* Subset sum
* Target combinations
* Combination sum with/without duplicates

---

## 15. Multiset Subset Recursion (Duplicates Allowed)

```cpp
void subsetWithDup(int i, vector<int>& arr, vector<int>& temp, vector<vector<int>>& ans) {
    ans.push_back(temp);
    for (int j = i; j < arr.size(); ++j) {
        if (j > i && arr[j] == arr[j - 1]) continue;
        temp.push_back(arr[j]);
        subsetWithDup(j + 1, arr, temp, ans);
        temp.pop_back();
    }
}
```

**Use Cases:**

* Subsets with duplicates
* Multiset combinations

---

## 16. Palindrome Partitioning

```cpp
bool isPalindrome(string& s, int start, int end) {
    while (start < end) {
        if (s[start++] != s[end--]) return false;
    }
    return true;
}

void partition(int start, string& s, vector<string>& path, vector<vector<string>>& res) {
    if (start == s.size()) {
        res.push_back(path);
        return;
    }
    for (int end = start; end < s.size(); ++end) {
        if (isPalindrome(s, start, end)) {
            path.push_back(s.substr(start, end - start + 1));
            partition(end + 1, s, path, res);
            path.pop_back();
        }
    }
}
```

**Use Cases:**

* Palindromic substring problems
* Partitioning problems

---

## Conclusion

These patterns form the foundation for solving most recursive, backtracking, and dynamic programming problems. Mastering them will greatly enhance your algorithmic thinking. For each pattern, try:

* Dry run with small inputs
* Write iterative version if possible
* Add memoization where applicable
* Practice with Leetcode/Codeforces problems

Feel free to expand this document by adding your own problem-specific tweaks!
