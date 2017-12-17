import * as types from './mutations-type'
import {playMode} from 'common/js/config'
import {shuffle} from 'common/js/util'

function findIndex (list, song){
  return list.findIndex((item) => {
    return item.id === song.id
  })
}


//用一个action 来 提交多个mutation
export const selectPlay = function ({commit,state},{list,index}){
  commit(types.SET_SEQUENCE_LIST,list)  //
  if(state.mode === playMode.random){
    let randomList = shuffle(list)
    commit(types.SET_PLAYLIST,randomList)
    index = findIndex(randomList,list[index])
  } else {
    commit(types.SET_PLAYLIST,list)   //设置播放列表
  }
  commit(types.SET_CURRENT_INDEX,index) //获取当前索引
  commit(types.SET_FULL_SCREEN, true)  //全屏
  commit(types.SET_PLAYING_STATE, true) //开始播放
}
