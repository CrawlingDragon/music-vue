function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)  //获取2个数字之间的随机数
}

export function shuffle(arr) {
  let _arr = arr.slice()  //返回原数组
  for (let i = 0; i < _arr.length; i++) {
    let j = getRandomInt(0, i)  // 返回索引直之间的随机数
    let t = _arr[i]          // 当前索引的值
    _arr[i] = _arr[j]       //
    _arr[j] = t
  }
  return _arr
}

export function debounce(fn, ms) {
  let timer
  return function (...args) {
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      fn.apply(this, args)
    }, ms)
  }
}
