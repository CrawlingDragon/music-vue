import storage from 'good-storage'


const SEARCH_KEY = '_search_'  //保存本地缓存的localstorage的key
const SEARCH_MAX_LEN = 15  //缓存的最大长度
const PLAY_KEY = '_play_' //保存播放过的列表---->个人中心
const FAVORITE_KEY = '_favorite_'
const FAVORITE_MAX_LEN = 10

function insertArray(arr, val, compare, maxLen) {
  let index = arr.findIndex(compare) //这里的compare是个一个findIndex的函数

  if (index === 0) {
    return
  }
  if (index > 0) {
    arr.splice(index, 1) //先删除这个内容
  }
  arr.unshift(val)  //在数组开头加入这个内容

  if (maxLen && arr.length > maxLen) {
    arr.pop()  //当arr.length 大于最大规定长度，就删除数组的最后一位
  }

}

function deleteFromArray(arr, compare) {
  const index = arr.findIndex(compare)
  if (index > -1) {
    arr.splice(index, 1)
  }
}

//保存搜索历史缓存
export function saveSearch(query) {
  let searches = storage.get(SEARCH_KEY, []) //首先从storage里读取缓存
  insertArray(searches, query, (item) => {  //利用insertArray，操作searches数组
    return item === query
  }, SEARCH_MAX_LEN)
  storage.set(SEARCH_KEY, searches)  //重新保存缓存searches数组
  return searches  //最后返回searches数组
}

//删除搜索历史缓存
export function deleteSearch(query) {
  let searches = storage.get(SEARCH_KEY, [])
  deleteFromArray(searches, (item) => {
    return item === query
  })
  storage.set(SEARCH_KEY, searches)  //重新保存缓存searches数组
  return searches  //最后返回searches数组
}


//读取搜索历史缓存
export function loadSearch() {
  return storage.get(SEARCH_KEY, [])
}

//清楚所搜历史缓存

export function clearSearch() {
  storage.remove(SEARCH_KEY)
  return []
}

export function savePlay(song) {
  let songs = storage.get(PLAY_KEY, [])
  insertArray(songs, song, (item) => {
    return song.id === item.id
  }, PLAY_MAX_LEN)
  storage.set(PLAY_KEY, songs)
  return songs
}

export function loadPlay() {
  return storage.get(PLAY_KEY, [])
}

export function saveFavorite(song) {
  let songs = storage.get(FAVORITE_KEY, [])
  insertArray(songs, song, (item) => {
    return item.id === song.id
  }, FAVORITE_MAX_LEN)
  storage.set(FAVORITE_KEY, songs)
  return songs
}

export function deleteFavorite(song) {
  let songs = storage.get(FAVORITE_KEY, [])
  deleteFromArray(songs, (item) => {
    return item.id === song.id
  })
  storage.set(FAVORITE_KEY, songs)
  return songs
}

export function loadFavorite() {
  return storage.get(FAVORITE_KEY, [])
}

