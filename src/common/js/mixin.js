import {mapGetters,mapActions} from 'vuex'

export const playlistMixin = {
  computed:{
    ...mapGetters([
     'playlist'
    ])
  },
  mounted() {
    this.handlePlayList(this.playlist)
  },
  activated(){
    this.handlePlayList(this.playlist)
  },
  method:{
    handlePlayList(){
      throw new Error('没有调用mixin-playlist')
    }
  },
  watch:{
    playList(newVal){
      this.handlePlayList(newVal)
    }
  }
}

export const searchMixin = {
  data (){
    return {
      query:'',
      refreshDelay:120
    }
  },
  computed:{
    ...mapGetters([
      'searchHistory'
    ])
  },
  methods:{
    onQueryChange(query){
      //处理带空格的情况
      this.query = query.trim()
    },
    blurInput(){
      this.$ref.searchBox.blur()
    },
    addQuery(query){
      this.$refs.searchBox.setQuery(query)
    },
    saveSearch(){
      this.saveSearchHistory(this.query)
    },
    ...mapActions([
      'saveSearchHistory',
      'deleteSearchHistory'
    ])
  }

}
