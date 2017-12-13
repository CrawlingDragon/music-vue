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

export function getSingerDetail(singerId){
  let url = 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_singer_track_cp.fcg'
  const data = Object.assign({},commonParams,{
    hostUin: 0,
    needNewCode: 0,
    platform: 'yqq',
    order: 'listen',
    begin: 0,
    num: 80,
    songstatus: 1,
    singermid: singerId
  })
  return Jsonp(url, data, options)
}
