function mobile (phoneNo) {
  return /^1[3456789]\d{9}$/.test(phoneNo)
}

function adcode (str) {
  return /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(str)
}

function username (input) {
  return /^[\u4e00-\u9fa5]{2,4}$/.test(input)
}

export {
  mobile,
  adcode,
  username
}
