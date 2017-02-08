<template>
  <div class="wrap">
    <div class='header'>
      <div class="header-top">
      	<div class="header-top-img">
      		<img src="./assets/img/image.png" alt="" />
      	</div>
      </div>
      <div class="header-con">
      	<div class="header-con-name"><router-link to="/" exact>Quan</router-link></div>
      	<div class="header-con-text">The darkest hour is before the dawn</div>
      	<div class="header-con-nav">
      		<ul>
		        <router-link to="/" exact>Home</router-link>
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
  export default {
    data () {
      return {
        loader: true
      }
    },
  }
</script>
