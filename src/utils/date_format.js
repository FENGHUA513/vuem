/**
 *  日期格式化
 *  dateFormat(date, mask)把日期格式化成字符串。
 *
 *  参数说明：
 *  date       要转换的日期，date 或者 string 类型
 *  mask       转换格式，说明如下
 *
 *  使用方法：
 *  let date = new Date()
 *  let str = new Date().getTime()
 *  let time1 = dateFormat(date, 'yyyy-mm-dd HH:MM:ss') //2017-06-03 18:00:00
 *  let time2 = dateFormat(str, 'yyyy-mm-dd HH:MM:ss')
 *
 *   格式       描述
 *   --------   ---------------------------------------------------------------
 *   yy         年份后两位，如2015取后两位是15。
 *   yyyy       年份四位。
 *   m          月份，取值1 ~ 12。
 *   mm         月份，取值01 ~ 12，如果月份为个位数，前面补0。
 *   d          日期在月中的第几天，取值1~31。
 *   dd         日期在月中的第几天，取值01~31，如果天数为个位数，前面补0。
 *   H          24小时进制，取值0~23。
 *   HH         24小时进制，取值00~23，如果小时为个位数，前面补0。
 *   h          12小时进制，取值0~11。
 *   hh         12小时进制，取值00~11，如果小时为个位数，前面补0。
 *   M          分钟，取值0~59。
 *   MM         分钟，取值00~59，如果为个位数，前面补0。
 *   s          秒，取值0~59。
 *   ss         秒，取值00~59，如果为个位数，前面补0。
 *   S          毫秒，取值0~999。
 *   SS         毫秒，取值000~999，如果不足三位数，前面补0。
 *   --------   ---------------------------------------------------------------
 *
 * by zyy
 */
function dateFormat (date, mask) {
  let token = /d{1,2}|m{1,2}|T{1,3}|yy(?:yy)?|([HhMsSt])\1?||'[^']*'|'[^']*'/g

  let pad = (val, len) => {
    val = String(val)
    len = len || 2
    while (val.length < len) val = '0' + val
    return val
  }

  date = date ? new Date(date) : new Date()
  mask = mask || 'yyyy-mm-dd HH:MM:ss'
  if (isNaN(date)) throw SyntaxError('invalid date')

  let d = date.getDate()
  let m = date.getMonth()
  let y = date.getFullYear()
  let H = date.getHours()
  let M = date.getMinutes()
  let s = date.getSeconds()
  let L = date.getMilliseconds()
  let flags = {
    yy: String(y).slice(2),
    yyyy: y,
    m: m + 1,
    mm: pad(m + 1),
    d: d,
    dd: pad(d),
    h: H % 12 || 12,
    hh: pad(H % 12 || 12),
    H: H,
    HH: pad(H),
    M: M,
    MM: pad(M),
    s: s,
    ss: pad(s),
    S: L,
    SS: pad(L, 3)
  }

  return mask.replace(token, function ($0) {
    return $0 in flags ? flags[$0] : $0.slice(1, $0.length - 1)
  })
}

export default dateFormat
