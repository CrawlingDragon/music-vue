<template>
  <div class="recommend">
    <Slider>
      <div v-for="item in recommends">
        <a :href="item.linkUrl">
          <img :src="item.picUrl" alt="">
        </a>
      </div>
    </Slider>
  </div>
</template>

<script type="text/ecmascript-6">
  import {getRecommend} from 'api/recommend'
  import {ERR_OK} from 'api/config'
  import Slider from 'base/slider/slider'
  export default {
    data() {
      return {
        recommends: []
      }
    },
    created() {
      this._getRecommend()
    },
    mounted() {
    },
    methods: {
      _getRecommend() {
        getRecommend().then((res) => {
          if (res.code === ERR_OK) {
            this.recommends = res.data.slider
          }
        })
      }
    },
    components:{
      Slider
    }
  }

</script>

<style scoped lang="stylus" rel="stylesheet/stylus">

</style>
