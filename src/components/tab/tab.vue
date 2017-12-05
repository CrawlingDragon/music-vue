<template>
  <div id="tab" class="tab">
    <router-link to="/recommend" tag="div" class="tab-item">
      <span class="tab-link">推荐</span>
    </router-link>
    <router-link tag="div" to="rank" class="tab-item">
      <span class="tab-link">排行</span>
    </router-link>
    <router-link tag="div" to="/singer" class="tab-item">
      <span class="tab-link">歌手</span>
    </router-link>
    <router-link tag="div" to="/search" class="tab-item">
      <span class="tab-link">搜索</span>
    </router-link>
  </div>
</template>

<script>
  export default {}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  .tab
    display flex
    align-items:center
    justify-content:center
    height:44px
    line-height:44px
    .tab-item
      flex :1
      display inline-block
      text-align:center
      color:$color-text
      font-size:$font-size-medium
      .tab-link
        color:$color-text-l
        padding-bottom:5px
      &.router-link-active
        .tab-link
          color: $color-theme
          border-bottom:2px solid $color-theme
</style>
