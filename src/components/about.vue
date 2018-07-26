<template>
	  <div class="home">
	  	<div class="home-con">
	  		<div class="home-con-box">
	  			<h3>基本信息</h3>
	  			<ul>
	  				<li><span>姓&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp名</span>：<p>唐啸泉</p></li>
	  				<li><span>入行时间</span>：<p>2015.10</p></li>
	  				<li><span>当前职业</span>：<p>web前端工程师</p></li>
	  				<li><span>所在城市</span>：<p>长沙</p></li>
	  				<li><span>联系电话</span>：<p>15700749386</p></li>
	  				<li><span>联系邮箱</span>：<p>1020887472@qq.com</p></li>
	  			</ul>
	  		</div>
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
			width:80%;
			max-width: 680px;
			margin:100px auto 0;
			background: #fff;
			border-radius: 8px;
			padding:50px 20px;
			box-sizing: border-box;
			.home-con-box{
				width: 100%;
				h3{
					font-size: 20px;
					margin-bottom: 10px;
				}
				ul{
					li{
						padding: 10px 20px;
						font-size: 14px;
						span{
							display: inline-block;
							width: 58px;
						}
						p{
							display: inline-block;
						}
					}
				}
			}
		}
	}
	.js-inmobile {
		.home{
			.home-con{
				margin:3em auto 0;
				padding: 1.5em 0.6em;
				.home-con-box{
					width: 100%;
					h3{
						font-size: 14px;
						margin-bottom: 10px;
					}
					ul{
						li{
							padding: 0.3em 1em;
							font-size: 12px;
							span{
								display: inline-block;
								width: 4em;
							}
							p{
								display: inline-block;
							}
						}
					}
				}
			}
		}
	}
</style>