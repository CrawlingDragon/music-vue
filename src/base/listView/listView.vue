<template>
  <!--scroll组件的$emit的函数,listenScroll表示手否要监听滚动，probeType是否节流滚动-->
  <scroll class="listview"
          :data="data"
          :listen-scroll="listenScroll"
          :probe-type="probeType"
          ref="listview"
          :scroll="scrollView"
  >
    <ul>
      <li class="list-group" ref="listGroup" v-for="group in data">
        <h2 class="list-group-title">{{group.title}}</h2>
        <ul>
          <li class="list-group-item" v-for="item in group.items">
            <img v-lazy="item.avatar" alt="" class="avatar">
            <span class="name">{{item.name}}</span>
          </li>
        </ul>
      </li>
    </ul>
    <div class="list-shortcut" @touchstart.stop.prevent="onShortCutTouchStart"
         @touchmove.stop.prevent="onShortCutTouchMove">
      <ul>
        <li class="item" v-for="(item, index) in shortCutList" :data-index="index">{{item}}</li>
      </ul>
    </div>
    <div class="list-fixed" ref="fixed" v-show="!data.length">
      <div class="fixed-title"></div>
    </div>
    <div class="loading-container" v-show="!data.length">
      <loading></loading>
    </div>
  </scroll>
</template>

<script type="text/ecmascript-6">
  import Scroll from 'base/scroll/scroll'
  import Loading from 'base/loading/loading'
  import {getData} from 'common/js/dom'

  const ANCHOR_HEIGHT = 18
  export default {
    props: {
      data: {
        type: Array,
        default: []
      }
    },
    data() {
      return {
        scrollY: -1,     //滚动高度
        currentIndex: 0 //当前索引
      }
    },
    created() {
      this.probeType = 3
      this.listenScroll = true
      this.listHeight = []
      this.touch = {}
    },
    computed: {
      shortCutList() {
        return this.data.map((item) => {
          return item.title.substr(0, 1)
        })
      }
    },
    mounted() {
    },
    methods: {
      _calculateHeight() {               //计算左边栏高度合集
        this.listHeight = []
        let height = 0
        this.listHeight.push(height)    // 第一个高度为0
        let list = this.$refs.listGroup
        for (let i = 0; i < list.length; i++) {
          let item = list[i].clientHeight
          height += item
          this.listHeight.push(height)
        }
      },
      onShortCutTouchStart(e) {
        let anchorIndex = getData(e.target, 'index')
        let firstTouch = e.touches[0]        //表示第一个手指
        this.touch.y1 = firstTouch.pageY     //获取手指点击的第一个Y坐标
        this.touch.anchorIndex = anchorIndex //touch={y1:pageY,anchorIndex:anchorIndex}

        this._scrollTo(anchorIndex)
      },
      onShortCutTouchMove(e) {
        let firstTouch = e.touches[0]  // 获取第一个手指
        this.touch.y2 = firstTouch.pageY  // 获取一个手指点的Y坐标，存在Y2
        let delta = Math.floor((this.touch.y2 - this.touch.y1) / ANCHOR_HEIGHT)  //计算第二次移动的Y2 - Y1的长度，除以每个li的高度，向下取整，得出移动了多少个index
        let anchorIndex = parseInt(this.touch.anchorIndex) + delta  //第一次点击li的自定义index+移动的距离得出的index，相加得到最终的index

        this._scrollTo(anchorIndex)  //BScroll的scrollTOElement() 封装后的
      },
      scrollView(pro) {
        this.scrollY = pro
      },
      _scrollTo(index) {
        if (index == null) { //当左边栏index不存在时
          return
        }
        if (index < 0) {     //当左边栏index小于0
          index = 0
        } else if (index > this.listHeight.length - 2) {  //当左边栏index最末尾
          index = this.listHeight - 2
        }
        this.scrollY = -this.listHeight[index]   //获取滚动的高度
        this.$refs.listview.scrollToElement(this.$refs.listGroup[index], 0)
      }
    },
    watch: {
      data() {
        setTimeout(() => {
          this._calculateHeight()  //观察listHeight 记录一级栏目的高度集合数组
        }, 20)
      }
    },
    components: {
      Scroll,
      Loading
    }
  }

</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"

  .listview
    position: relative
    width: 100%
    height: 100%
    overflow: hidden
    background: $color-background
    .list-group
      padding-bottom: 30px
      .list-group-title
        height: 30px
        line-height: 30px
        padding-left: 20px
        font-size: $font-size-small
        color: $color-text-l
        background: $color-highlight-background
      .list-group-item
        display: flex
        align-items: center
        padding: 20px 0 0 30px
        .avatar
          width: 50px
          height: 50px
          border-radius: 50%
        .name
          margin-left: 20px
          color: $color-text-l
          font-size: $font-size-medium
    .list-shortcut
      position: absolute
      z-index: 30
      right: 0
      top: 50%
      transform: translateY(-50%)
      width: 20px
      padding: 20px 0
      border-radius: 10px
      text-align: center
      background: $color-background-d
      font-family: Helvetica
      .item
        padding: 3px
        line-height: 1
        color: $color-text-l
        font-size: $font-size-small
        &.current
          color: $color-theme
    .list-fixed
      position: absolute
      top: 0
      left: 0
      width: 100%
      .fixed-title
        height: 30px
        line-height: 30px
        padding-left: 20px
        font-size: $font-size-small
        color: $color-text-l
        background: $color-highlight-background
    .loading-container
      position: absolute
      width: 100%
      top: 50%
      transform: translateY(-50%)
</style>
