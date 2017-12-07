import Jsonp from 'common/js/jsonp'
import {commonParams, options} from './config'

export function getSingers(url,data,option){
  url = 'https://c.y.qq.com/v8/fcg-bin/v8.fcg'
  data = Object.assign({},commonParams,{
    channel:'singer',
    page:'list',
    key:'all_all_all',
    pagesize:100,
    pagenum:1,
    g_tk:5381,
    loginUin:363630867,
    hostUin:0,
    platform:'yqq',
    needNewCode:0,
  })
  return Jsonp(url,data,options)
}
