<template>
  <div class="search">
    <div class="search-box-wrapper">
      <search-box ref="searchBox" @query="onQueryChange"></search-box>
    </div>
    <div class="shortcut-wrapper">
      <scroll ref="shortcut"
              class="shortcut"
              :refreshDelay="refreshDelay"
              :data="shortcut">
        <div>
          <div class="hot-key">
            <h1 class="title">热门搜索</h1>
            <ul>
              <li v-for="item in hotkey" @click="addQuery(item.k)" class="item"><span>{{item.k}}</span></li>
            </ul>
          </div>
          <div class="search-history">
            <h1 class="title">
              <span class="text">搜索历史</span>
              <span class="clear" @click="clearSearch">
                <i class="icon-clear"></i>
              </span>
            </h1>
            <search-list :searches="searchHistory" @delete="deleteSearchHistory" @select="addQuery"></search-list>
          </div>
        </div>
      </scroll>
    </div>
    <div class="search-result" v-show="query">
      <suggest :query="query" @select="saveSearch"></suggest>
    </div>
    <confirm text="确定要清空历史搜索吗" cancel="否" ref="confirm" @confirm="clearSearchHistory"></confirm>
    <router-view></router-view>
  </div>
</template>

<script type="text/ecmascript-6">
  import SearchBox from "base/search-box/search-box"
  import searchList from 'base/search-list/search-list'
  import {getHotKey} from 'api/search'
  import {ERR_OK} from 'api/config'
  import Scroll from "base/scroll/scroll"
  import Suggest from "components/suggest/suggest"
  import confirm from "base/confirm/confirm"
  import {searchMixin} from 'common/js/mixin'
  import {mapActions} from 'vuex'

  const refreshDelay = 20
  export default {
    mixins:[searchMixin],
    components: {
      Scroll,
      SearchBox,
      Suggest,
      searchList,
      confirm
    },
    data() {
      return {
        hotkey: []
      }
    },
    created() {
      this._getHotKey()
    },
    computed:{
      shortcut(){
        return this.hotkey.concat(this.saveSearchHistory)
      }
    },
    methods: {
      _getHotKey() {
        getHotKey().then((res) => {
          if (res.code === ERR_OK) {
            this.hotkey = res.data.hotkey.slice(0, 10)
          }
        })
      },
      clearSearch(){
        this.$refs.confirm.show()
      },
      ...mapActions([
        'clearSearchHistory'
      ])
    },
    watch: {
      query(newQuery) {
        if (!newQuery) {
          setTimeout(() => {
            this.$refs.shortcut.refresh()
          })
        }
      }
    }
  }

</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"

  .search
    .search-box-wrapper
      margin: 20px
    .shortcut-wrapper
      position: fixed
      top: 178px
      bottom: 0
      width: 100%
      .shortcut
        height: 100%
        overflow: hidden
        .hot-key
          margin: 0 20px 20px 20px
          .title
            margin-bottom: 20px
            font-size: $font-size-medium
            color: $color-text-l
          .item
            display: inline-block
            padding: 5px 10px
            margin: 0 20px 10px 0
            border-radius: 6px
            background: $color-highlight-background
            font-size: $font-size-medium
            color: $color-text-d
        .search-history
          position: relative
          margin: 0 20px
          .title
            display: flex
            align-items: center
            height: 40px
            font-size: $font-size-medium
            color: $color-text-l
            .text
              flex: 1
            .clear
              extend-click()
              .icon-clear
                font-size: $font-size-medium
                color: $color-text-d
    .search-result
      position: fixed
      width: 100%
      top: 178px
      bottom: 0
      background: #222;
</style>
