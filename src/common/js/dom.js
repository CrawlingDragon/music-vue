//判断是否已经有这个className
export function hasClass(el, className) {
  let reg = new RegExp('(^|\\s)' + className + '(\\s|$)')
  return reg.test(el.className)
}

//添加className
export function addClass(el, className) {
  if(hasClass(el,className)) {
    return
  }
  let newClass = el.className.split(' ');  //['class1','class2']
  newClass.push(className)
  el.className = newClass.join(' ') //把数组用空格分开，组成字符串 class="class1 class2 newClass"
}
