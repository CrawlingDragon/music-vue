import {mapGetters} from 'vuex'

export const playlistMixin = {
  computed:{
    ...mapGetters([
     'playlist'
    ])
  },
  mounted() {
    this.handlePlayList(this.playlist)
  },
  activated(){
    this.handlePlayList(this.playlist)
  },
  method:{
    handlePlayList(){
      throw new Error('没有调用mixin-playlist')
    }
  },
  watch:{
    playList(newVal){
      this.handlePlayList(newVal)
    }
  }
}
