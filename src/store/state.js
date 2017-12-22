import {playMode} from 'common/js/config'

const state = {
  singer:{},
   playing:false, //播放状态
   fullScreen: false, //是否全屏播放
   playlist:[], //播放列表
   sequenceList:[],
   mode: playMode.sequence,
   currentIndex : -1, //当前歌曲的索引
   disc:{},
   topList:{}
}

export default state
