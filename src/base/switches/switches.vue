<!--  -->
<template>
 <ul class="switches">
   <li class="switch-item" v-for="(item,index) in switches" :class="{'active':currentIndex === index}" @click="switchItem(index)">
     <span>{{item.name}}</span>
   </li>
 </ul>
</template>

<script type='text/ecmascript'>
export default {
  props:{
    switches:{
      type:Array,
      defalut:[]
    },
    currentIndex:{
      type:Number,
      default:0
    }
  },
  data() {
    return {};
  },

  components: {},

  computed: {},

  methods: {
    switchItem(index){
      this.$emit('switch',index)
    }
  }
};
</script>
<style lang='stylus' scoped>
@import '~common/stylus/variable'
.switches
  display flex
  align-item center
  justify-content center
  width 240px
  margin 0 auto
  border 1px solid $color-highlight-background
  border-radius 5px
  .switch-item
    flex 1
    padding 8px
    text-align center
    font-size $font-size-medium
    color $color-text-d
    &.active
      background $color-lighlight-background
      color $color-text
</style>