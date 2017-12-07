import Jsonp from 'common/js/jsonp'
import Axios from 'axios'
import {commonParams, options} from './config'
const debug = process.env.NODE_ENV !== 'production'

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
export function getDiscList() {
  // 线上环境地址，同学们根据自己的需要配置修改
  const url = debug ? '/api/getDiscList' : 'http://ustbhuangyi.com/music/api/getDiscList'

  const data = Object.assign({}, commonParams, {
    platform: 'yqq',
    hostUin: 0,
    sin: 0,
    ein: 29,
    sortId: 5,
    needNewCode: 0,
    categoryId: 10000000,
    rnd: Math.random(),
    format: 'json'
  })

  return Axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}