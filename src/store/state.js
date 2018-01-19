import {playMode} from 'common/js/config'
import {loadSearch} from 'common/js/cache'

const state = {
  singer:{},
   playing:false, //播放状态
   fullScreen: false, //是否全屏播放
   playlist:[], //播放列表
   sequenceList:[],
   mode: playMode.sequence,
   currentIndex : -1, //当前歌曲的索引
   disc:{},
   topList:{},
  searchHistory:loadSearch()
}

export default state
