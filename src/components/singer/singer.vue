<template>
  <div>

  </div>
</template>

<script type="text/ecmascript-6">
  import {getSingers} from 'api/singer'
  import {ERR_OK} from 'api/config'

  export default {
    data() {
      return {
        singers: []
      }
    },
    created() {
      this._getSingers()
    },
    mounted() {
    },
    methods: {
      _getSingers() {
        getSingers().then((res) => {
          if (res.code === ERR_OK) {
            this.singers = res.data.list
            console.log(res.data.list)
          }
        })
      }
    }
  }

</script>

<style scoped lang="stylus" rel="stylesheet/stylus">

</style>
