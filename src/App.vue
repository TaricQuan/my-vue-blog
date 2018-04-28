<template>
  <div class="wrap">
    <div class='header'>
      <div class="header-top">
      	<div class="header-top-img">
      		<img src="./assets/img/image.png" alt="" />
      	</div>
      </div>
      <div class="header-con">
      	<div class="header-con-name">Quan</div>
      	<div class="header-con-text">The darkest hour is before the dawn</div>
      	<div class="header-con-nav">
      		<ul>
		        <router-link to="/" exact>article</router-link>
		        <router-link to="/worklog">worklog</router-link>
      		</ul>
      	</div>
      </div>
    </div>
    <div class="wrap-con">
	    <router-view 
	      :loader="loader"
	      @set-loader-state="setLoaderState">
	    </router-view>
    </div>
  </div>
</template>
<style>
	@import url("assets/css/CaseUI.css");
</style>
<script>
  let scrollDistance  // 每帧滚动的距离
  let tool4Top        // top 元素
  // 滑动到顶部
  let scroll2TopLinear = () => {
    if (document.scrollingElement.scrollTop <= 0) return
    document.scrollingElement.scrollTop -= scrollDistance
    window.requestAnimationFrame(scroll2TopLinear)
  }
  // 切换元素 className 和 显示/隐藏
  let toggleElementState = (elem, addClass, removeClass, display, delay) => {
    elem.classList.remove(removeClass)
    elem.classList.add(addClass)
    setTimeout(() => { elem.style.display = display }, delay)
  }
  // 滚动事件
  if (!window.lib.inMobile) {
    document.addEventListener('scroll', () => {
      let leave = 'fadeUpDown-leave-active'
      let enter = 'fadeUpDown-enter-active'
      if (document.scrollingElement.scrollTop <= 0) {
        toggleElementState(tool4Top, leave, enter, 'none', 200)
      } else {
        if (tool4Top.className.indexOf(enter) !== -1) return
        toggleElementState(tool4Top, enter, leave, 'block', 200)
      }
    })
  }
  export default {
    mounted () {
      this.$nextTick(() => {
        tool4Top = document.querySelector('.app-tools__top')
        if (!window.lib.inMobile) { tool4Top.style.right = ((window.innerWidth - 900) / 2 - 50) + 'px' }
      })
    },
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
