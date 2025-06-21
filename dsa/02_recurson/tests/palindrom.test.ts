import isValidPalindrome from "../array/palindrom";

export default function isValidPalindromTests(){
 describe('valid palindrome',()=>{
    it("should return true",()=>{
        expect(isValidPalindrome('')).toEqual(true)
    })
    it("Invalid",()=>{
        expect(isValidPalindrome('1234')).toEqual(false)
    })
    it("valid",()=>{
        expect(isValidPalindrome('1221')).toEqual(true)
    })
 })
}