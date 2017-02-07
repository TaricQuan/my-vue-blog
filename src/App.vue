<template>
  <div class="app-wrapper">
    <header class="app-header dashed dashed-bottom">
      <h1><router-link to="/">Quan</router-link></h1>
      <nav>
        <router-link to="/" exact>名&nbsp;片</router-link>
        <router-link to="/worklog">工作日志</router-link>
      </nav>
    </header>
    <router-view 
      :loader="loader"
      @set-loader-state="setLoaderState">
    </router-view>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        loader: true
      }
    },
    methods: {
      setLoaderState (state) {
        this.loader = state
      },
      scroll2TopLinear () {
        // 为什么是 18？
        // 因为我希望滑动到顶部的时长为 300ms
        // 显示屏的刷新速率为 60FPS (每秒刷新 60 次)
        // (1000 / 60 = 16.666666666666668) => 即每 16.7ms 刷新一次 => 16.7ms/帧
        // 所以：300 / 16.7 = 17.964071856287426 => 即滚动到顶部需要 18 帧
        // scrollDistance => 每帧滚动的距离
        scrollDistance = document.scrollingElement.scrollTop / 18
        window.requestAnimationFrame(scroll2TopLinear)
      }
    }
  }
</script>

<style>

</style>
