# vue-music

> vue-music for learn

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
问题
为什么vue的component内 stylus @import 路径为~

日记

package.json
1.dependencies ==>          babel-runtime         -->           可以对es6语法进行转译
                            fastClick             -->           移动端300毫秒点击的问题(快速点击)


2.devDependencies ==>       babel-polyfill        -->           可以使用es6的API,比如Promise
