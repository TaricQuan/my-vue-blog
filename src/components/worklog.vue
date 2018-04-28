<template>
  <section class="worklog-page">
    <router-view @set-loader-state="setLoaderState"></router-view>
  </section>
</template>

<script>
  export default {
    methods: {
      setLoaderState (state) {
        this.$emit('set-loader-state', state)
      }
    }
  }
</script>
<style type="text/css">
	.worklog-list{padding: 20px;}
	.worklog-list__item{display: inline-block;margin-right: 20px}
	.worklog-list__item a{font-size:24px;color:#FDA545;}
	.worklog-list__item:hover{border-bottom: 1px solid #FDA545;}
</style>