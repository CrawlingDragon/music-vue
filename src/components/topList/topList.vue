<template>
    <transition name="slide">
      <music-list :title="title" :bgImage="bgImage" :songs="songs" :rank="rank"></music-list>
    </transition>
</template>

<script>
    import MusicList from "../music-list/music-list";
    import {getMusicList} from "../../api/rank";
    import {ERR_OK} from 'api/config'
    import {createSong} from 'common/js/song'
    import {mapGetters} from 'vuex'
    export default {
      data(){
        return{
          songs:[],
          rank:true
        }
      },
      created(){
        this._getMusicList()
      },
      computed:{
        title(){
          return this.topList.topTitle
        },
        bgImage(){
          return this.topList.picUrl
        },
        ...mapGetters([
          'topList'
        ])
      },
      methods:{
        _getMusicList(){
          if(!this.topList.id){
            this.$router.push('/rank')
            return
          }
          getMusicList(this.topList.id).then((res) => {
           this.songs = this._normalizeMusicList(res.songlist)
          })
        },
        _normalizeMusicList(list){
          let ret = []
          list.forEach((item) => {
            const musicData = item.data
            if (musicData.songid && musicData.albummid) {
              console.log(musicData)
              ret.push(createSong(musicData))
            }
          })
          return ret
        }
      },
      components: {MusicList},
      name: "top-list"
    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .slide-enter-active, .slide-leave-active
    transition: all 0.3s ease

  .slide-enter, .slide-leave-to
    transform: translate3d(100%, 0, 0)
</style>
