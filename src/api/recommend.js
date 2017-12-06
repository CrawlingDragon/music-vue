import Jsonp from 'common/js/jsonp'
import Axios from 'axios'
import {commonParams, options} from './config'


// 获取轮播图图片数据
export function getRecommend() {
  let url = 'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg'
  let data = Object.assign({}, commonParams, {
    platform: 'h5',
    uin: 0,
    needNewCode: 1
  })
  return Jsonp(url, data, options)  //options 为jsonp库的callback
}

// 获取音乐列表数据
export function getDisList() {
  let url = ''
  let data = Object.assign({}, commonParams, {
    platform: 'yqq',
    hostUin: 0,
    sin: 0,
    en: 29,
    sortId: 5,
    needNewCode: 0,
    categoryId: 10000000,
    rnd: Math.random(),
    format: 'jsonp'
  })

  return Axios.get(url, {
    params: data
  })
    .then(function (res) {
      console.log(res)
    }).catch(function (error) {
      console.log(error)
    })
}
