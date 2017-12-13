<template>
  <transition name="slider">
    <music-list :title="title" :bg-image="bgImage" :songs="songs"></music-list>
  </transition>
</template>

<script type="text/ecmascript-6">
  import MusicList from 'components/music-list/music-list'
  import {getSingerDetail} from 'api/singer'
  import {ERR_OK} from 'api/config'
  import {createSong} from 'common/js/song'
  import {mapGetters} from 'vuex'
  export default {
    data() {
      return {
        songs:[]
      }
    },
    created() {
      this._getDetail()
    },
    mounted() {
    },
    computed: {
      ...mapGetters([
        'singer'
      ]),
      title(){
        return this.singer.name
      },
      bgImage(){
        return this.singer.avatar
      }
    },
    methods: {
      _getDetail(){
        if(!this.singer.id){  //防止直接刷新歌手详情页，没有歌手id
          this.$router.push('/singer')
          return
        }

        getSingerDetail(this.singer.id).then((res) => {
          if(res.code === ERR_OK){
            this.songs = this._normalizeSongs(res.data.list)
          }
        })
      },
      _normalizeSongs(list){  //数据整理
        let ret = []
        list.forEach((item) => {
          let {musicData} = item
          if(musicData.songid && musicData.albummid){
            ret.push(createSong(musicData))
          }

        })
        return ret
      }
    },
    components: {
      MusicList
    }
  }

</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .slider-enter-active, .slider-leave-active
    transition: all 0.3s

  .slider-enter, .slider-leave-to
    transform: translate3d(100%, 0, 0)
</style>
