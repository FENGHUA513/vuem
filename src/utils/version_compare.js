/**
 *  版本号大小比较
 *  versionCompare(current, compare)
 *
 *  compare值与current值对比，返回 current - compare
 *  若版本值相等，返回true
 *
 *  使用方法：
 *  var a = versionCompare('1.2.0', '1.3.0') // false
 *  var b = versionCompare('1.3.0', '1.4.0') // true
 *  by zyy
 */

function versionCompare (current, compare) {
  // 依据"."截取，分别比较大小
  var currentArr = current.split('.')
  var compareArr = compare.split('.')

  var arrMinLength = Math.min(currentArr.length, compareArr.length)
  var result = true

  for (var i = 0; i < arrMinLength; i++) {
    if (currentArr[i] !== compareArr[i]) {
      result = currentArr[i] - compareArr[i] > 0
      break
    }
  }

  return result
}

export default versionCompare
