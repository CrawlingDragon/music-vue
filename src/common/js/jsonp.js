import orignJsonp from 'jsonp'

export default function jsonp(url, data, option) {
  url += (url.indexOf('?') < 0 ? '?' : '&') + param(data)  //找不到？号就第一个为？，这里的data是url后面跟的参数
  return new Promise((resolve, reject) => {
    orignJsonp(url, option, (err, data) => {
      if (!err) {
        resolve(data)
      } else {
        reject(err)
      }
    })
  })
}

export function param(data) {  // 合并data对象为url参数
  let url = ''
  for (let k in data) {
    let val = data[k] !== undefined ? data[k] : ''
    url += '&' + k + '=' + encodeURIComponent(val)
  }
  return url ? url.substring(1) : ''
}
