<template>
  <scroll ref="suggest"
          class="suggest"
  >
    <ul class="suggest-list">
      <li class="suggest-item" v-for="item in result">
        <div class="icon">
          <i :class="getIconCls(item)"></i>
        </div>
        <div class="name">
          <p class="text" v-html="getDisplayName(item)"></p>
        </div>
      </li>
      <loading v-show="" title=""></loading>
    </ul>
    <div class="no-result-wrapper">

    </div>
  </scroll>
</template>

<script>
  import Scroll from "../../base/scroll/scroll"
  import Loading from 'base/loading/loading'
  import {search} from 'api/search'
  import {ERR_OK} from 'api/config'
  import {createSong} from 'common/js/song'
  const prepage = 20
  const TYPE_SINGER = 'singer'
  export default {
    props: {
      query: {
        type: String,
        default: ''
      },
      showSinger: {
        type: Boolean,
        default: true
      }
    },
    data() {
      return {
        page:1,
        pullup:true,
        beforeScroll:true,
        hasMore:true,
        result:[]
      }
    },
    created() {

    },
    methods: {
      getIconCls(item){
        if(item.type === TYPE_SINGER){
          return 'icon-mine'
        } else {
          return 'icon-music'
        }
      },
      getDisplayName(item){
        if(item.type === TYPE_SINGER) {
          return item.singername
        } else {
          return `${item.name}-${item.singer}`
        }
      },
      search() {
        this.page = 1
        this.hasMore = true
        this.$refs.suggest.scrollTo(0, 0)
        search(this.query, this.page, this.showSinger, prepage).then((res) => {
          if (res.code === ERR_OK) {
            this.result = this._genResult(res.data)
          }
        })
      },
      _genResult(data){
        let ret = []
        if(data.zhida && data.zhida.singerid){
          ret.push({...data.zhida,...{type:TYPE_SINGER}})
        }
        if(data.song){
          ret = ret.concat(this._normalize(data.song.list))
        }
        return ret
      },
      _normalize(list){
        let ret = []
        list.forEach((musicData) => {
          if(musicData.songid && musicData.albummid){
            ret.push(createSong(musicData))
          }
        })
        return ret
      }
    },
    components: {
      Scroll,
      Loading
    },
    name: "suggest",
    watch: {
      query(newQuery) {
        this.search(newQuery)
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"

  .suggest
    height 100%
    overflow hidden
    .suggest-list
      padding: 0 30px
      .suggest-item
        display flex
        align-items: center
        padding-bottom 20px
      .icon
        flex: 0 0 30px
        width 30px
        [class^="icon-"]
          font-size 14px
          color: $color-text-d
      .name
        flex 1
        font-size $font-size-medium
        color: $color-text-d
        overflow hidden
        .text
          no-wrap()
    .no-result-wrapper
      position absolute
      top: 50%
      left: 50%
      transform: translate(-50%, -50%)
</style>
