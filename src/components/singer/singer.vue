<template>
  <div class="singer" ref="singer">
    <list-view :data="singers" @select="selectSinger"></list-view>
    <router-view></router-view>
  </div>
</template>

<script type="text/ecmascript-6">
  import {getSingers} from 'api/singer'
  import {ERR_OK} from 'api/config'
  import ListView from 'base/listView/listView'
  import Singer from 'common/js/singer'
  import {mapMutations} from 'vuex'

  const HOT_NAME = '热门'    //定义hotname title
  const HOT_SINGER_LEN = 10 // 定义数据的前10条为热门数据
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
      _getSingers() {  //获取歌手数据
        getSingers().then((res) => {
          if (res.code === ERR_OK) {
            this.singers = this._normalizeSinger(res.data.list)
          }
        })
      },
      _normalizeSinger(list) {
        let map = {  //定义热门栏目对象
          hot: {
            title: HOT_NAME,
            items: []
          }
        }

        list.forEach((item, index) => { //定义a-b的列表对象
          if (list.indexOf(item) < HOT_SINGER_LEN) { // 取list数据的前10条给hot栏目
            map.hot.items.push(new Singer({  //new Singer 用es6的class 复制而来，不用每次都写avatar
              id: item.Fsinger_mid,
              name: item.Fsinger_name
            }))
          }

          let key = item.Findex   //list的英文排行 a-z
          if (!map[key]) {    //定义a-z的对象
            map[key] = {
              title: key,
              items: []
            }
          }

          map[key].items.push(new Singer({   //定义a-z栏目的数据
            id: item.Fsinger_mid,
            name: item.Fsinger_name
          }))

        })

        // 把map对象转换成有序数组
        let hot = []
        let ret = []

        for (let key in map) {
          let val = map[key]
          if (val.title.match(/[a-zA-Z]/)) {  //如果title有a-z，就添加到ret数组
            ret.push(val)
          } else if (val.title === HOT_NAME) {
            hot.push(val)
          }
        }

        ret.sort((a,b) => {
          return a.title.charCodeAt(0) - b.title.charCodeAt(0) // 根据title的首字母排序
        })
        return hot.concat(ret)  //最后返回hot和a-z数据的组合

      },
      selectSinger(item){
        this.$router.push({
          path:`/singer/${item.id}`
        })
        this.setSinger(item)
      },
      ...mapMutations({
        setSinger:'SET_SINGER'
      })
    },
    components: {
      ListView
    }
  }

</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .singer
    position: fixed
    top: 80px
    width: 100%
    bottom: 0
</style>
