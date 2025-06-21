# Two Pointer Patterns Cheat Sheet (Complete & Detailed)

This document provides **comprehensive explanations** and code examples of all important **Two Pointer patterns** in C++ that are frequently used in algorithmic problem-solving, competitive programming, and interviews.

---

## 1. Classic Two Pointers (Start and End)

**Pattern:** One pointer from the beginning, one from the end.

```cpp
bool hasPairWithSum(vector<int>& arr, int target) {
    int left = 0, right = arr.size() - 1;
    while (left < right) {
        int sum = arr[left] + arr[right];
        if (sum == target) return true;
        if (sum < target) left++;
        else right--;
    }
    return false;
}
```

**Use Cases:**

* Finding if a pair sums to a target (sorted array)
* Checking for palindromes
* Finding unique pairs with conditions

---

## 2. Same Direction Pointers (Sliding Window)

**Pattern:** Both pointers start at beginning and move forward.

```cpp
int maxSubarraySum(vector<int>& arr, int k) {
    int left = 0, sum = 0, maxSum = 0;
    for (int right = 0; right < arr.size(); right++) {
        sum += arr[right];
        if (right - left + 1 == k) {
            maxSum = max(maxSum, sum);
            sum -= arr[left++];
        }
    }
    return maxSum;
}
```

**Use Cases:**

* Fixed-size window problems
* Longest/shortest subarray with condition
* Variable window sum/count

---

## 3. Shrinking Window (Variable Size)

**Pattern:** Expand with `right`, contract with `left` to meet condition.

```cpp
int minSubArrayLen(int target, vector<int>& nums) {
    int sum = 0, left = 0, minLen = INT_MAX;
    for (int right = 0; right < nums.size(); ++right) {
        sum += nums[right];
        while (sum >= target) {
            minLen = min(minLen, right - left + 1);
            sum -= nums[left++];
        }
    }
    return minLen == INT_MAX ? 0 : minLen;
}
```

**Use Cases:**

* Minimum/maximum size subarrays
* Maintain invariant conditions (sum, frequency)

---

## 4. Two Pointers on Two Arrays

**Pattern:** Traverse both arrays using two pointers.

```cpp
vector<int> intersect(vector<int>& nums1, vector<int>& nums2) {
    vector<int> result;
    sort(nums1.begin(), nums1.end());
    sort(nums2.begin(), nums2.end());
    int i = 0, j = 0;
    while (i < nums1.size() && j < nums2.size()) {
        if (nums1[i] == nums2[j]) {
            result.push_back(nums1[i]);
            i++; j++;
        } else if (nums1[i] < nums2[j]) i++;
        else j++;
    }
    return result;
}
```

**Use Cases:**

* Merge operations
* Intersection of sorted arrays
* Syncing two sequences

---

## 5. Fast and Slow Pointers (Tortoise and Hare)

**Pattern:** One pointer moves faster than the other.

```cpp
bool hasCycle(ListNode *head) {
    ListNode *slow = head, *fast = head;
    while (fast && fast->next) {
        slow = slow->next;
        fast = fast->next->next;
        if (slow == fast) return true;
    }
    return false;
}
```

**Use Cases:**

* Detect cycles in linked lists
* Finding middle of linked list
* Detecting loops

---

## 6. In-Place Reversal Using Two Pointers

**Pattern:** Swap elements using pointers from both ends.

```cpp
void reverseArray(vector<int>& arr) {
    int left = 0, right = arr.size() - 1;
    while (left < right) {
        swap(arr[left++], arr[right--]);
    }
}
```

**Use Cases:**

* Reverse string/array
* Palindrome checking
* In-place rotation

---

## 7. Partition Arrays (Dutch National Flag / QuickSort Partition)

**Pattern:** Rearrange elements with two or three pointers.

```cpp
void sortColors(vector<int>& nums) {
    int low = 0, mid = 0, high = nums.size() - 1;
    while (mid <= high) {
        if (nums[mid] == 0)
            swap(nums[low++], nums[mid++]);
        else if (nums[mid] == 1)
            mid++;
        else
            swap(nums[mid], nums[high--]);
    }
}
```

**Use Cases:**

* Partitioning arrays
* Sorting 0s, 1s, 2s
* QuickSort variant

---

## 8. Two Pointers on Strings

**Pattern:** Compare characters from both ends.

```cpp
bool isPalindrome(string s) {
    int left = 0, right = s.length() - 1;
    while (left < right) {
        if (!isalnum(s[left])) { left++; continue; }
        if (!isalnum(s[right])) { right--; continue; }
        if (tolower(s[left]) != tolower(s[right])) return false;
        left++; right--;
    }
    return true;
}
```

**Use Cases:**

* Valid palindrome check
* Anagram comparisons
* Pattern matching

---

## 9. Binary Search with Two Pointers Logic

**Pattern:** Midpoint logic but reasoned like 2 pointers.

```cpp
int searchInsert(vector<int>& nums, int target) {
    int left = 0, right = nums.size() - 1;
    while (left <= right) {
        int mid = left + (right - left) / 2;
        if (nums[mid] == target) return mid;
        if (nums[mid] < target) left = mid + 1;
        else right = mid - 1;
    }
    return left;
}
```

**Use Cases:**

* Efficient searching
* Range problems

---

## 10. Triplet Search (Like 3Sum)

**Pattern:** Outer loop + inner 2 pointers

```cpp
vector<vector<int>> threeSum(vector<int>& nums) {
    vector<vector<int>> res;
    sort(nums.begin(), nums.end());
    for (int i = 0; i < nums.size(); ++i) {
        if (i > 0 && nums[i] == nums[i - 1]) continue;
        int left = i + 1, right = nums.size() - 1;
        while (left < right) {
            int sum = nums[i] + nums[left] + nums[right];
            if (sum == 0) {
                res.push_back({nums[i], nums[left], nums[right]});
                while (left < right && nums[left] == nums[left + 1]) left++;
                while (left < right && nums[right] == nums[right - 1]) right--;
                left++; right--;
            } else if (sum < 0) left++;
            else right--;
        }
    }
    return res;
}
```

**Use Cases:**

* 3Sum / 4Sum problems
* Triplet checking with constraints

---

## 📌 Final Tips

* Use two pointers when:

  * You have sorted input
  * You need linear-time space-efficient solutions
  * You can shrink/grow the window
* Always check if elements can repeat or must be distinct.
* Watch out for duplicates when generating pairs or triplets.

🎯 Mastering these patterns gives you an edge in string manipulation, array logic, and sliding window optimizations!
