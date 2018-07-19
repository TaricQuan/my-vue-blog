<template>
	  <div class="home">
	  	<div class="home-con">
	  		<div class="home-con_img"><img src="../assets/img/image.png" alt="" /></div>
	  	</div>
	  </div>
</template>

<script>
	export default {
	    data: () => ({
	      show: true
	    })
	  }
</script>

<style lang="scss">
	.home{
		overflow: hidden;
		.home-con{
			width:800px;
			margin:100px auto 0;
			background: #fff;
			border-radius: 8px;
			padding:50px 0;
			.home-con_img{
				margin: 0 auto;
				width: 80px;
				img{
					width:100%;
					display: block;
				}
			}
		}
	}
</style>