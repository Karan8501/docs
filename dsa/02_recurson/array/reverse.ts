export default function reverseArray<T>(arr: T[]): T[] {
    return reverse(arr)
  }

  export function reverse<T>(arr: T[], start: number = 0, end: number = arr.length - 1): T[] {
    if (start >= end) return arr;
    [arr[start], arr[end]] = [arr[end], arr[start]];
    return reverse(arr, start + 1, end - 1);
  }

  

