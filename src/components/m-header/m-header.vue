<template>
<div id="m-header" class="header">
  <div class="icon"></div>
  <div class="text">Chicken Music</div>
  <router-link tag="div" class="mine" to="/user">
    <i class="icon-mine"></i>
  </router-link>
</div>
</template>

<script>
	export default {

	}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable.styl"
  @import "~common/stylus/mixin.styl"

  .header
    positon: relative
    height: 44px
    text-align center
    color: $text-theme
    font-size:0
    .icon
      display: inline-block
      vertical-align: top
      margin-top: 6px
      width: 30px
      height: 32px
      margin-right: 9px
      bg-image('logo')
      background-size: 30px 32px
    .text
      display: inline-block
      vertical-align: top
      line-height: 44px
      font-size: $font-size-large
    .mine
      position: absolute
      top: 0
      right: 0
      .icon-mine
        display: block
        padding: 12px
        font-size: 20px
        color: $color-theme

</style>
