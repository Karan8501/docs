export default function isValidPalindrome(s: string): boolean {
    return checkPalindrome(s);
  }
  
  function checkPalindrome(s: string, start: number = 0, end: number = s.length - 1): boolean {
    if (start >= end) return true;
    if (s[start] !== s[end]) return false;
    return checkPalindrome(s, start + 1, end - 1);
  }
  
  console.log(isValidPalindrome("1221")); // true
  