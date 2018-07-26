<template>
	<section class="worklog-page">
		<router-view @set-loader-state="setLoaderState"></router-view>
	</section>
</template>

<script>
	export default {
		methods: {
			setLoaderState(state) {
				this.$emit('set-loader-state', state)
			}
		}
	}
</script>
<style lang="scss">
	.worklog-list-page{
		background: #fff;
		overflow: hidden;
		padding: 20px 0;
		h1{
			width: 100%;
			text-align: center;
			font-size: 24px;
			color: #333;
			line-height: 30px;
			margin-bottom: 10px;
		}
		.worklog-list {
			.worklog-list__item {
				display: inline-block;
				text-align: center;
				width:20%;
				margin-bottom:10px;
				line-height: 30px;
				a {
					font-size: 24px;
					color: #FDA545;
					&:hover {
						border-bottom: 1px solid #FDA545;
					}
				}
				&:nth-last-child(-n+5){
					margin: 0!important;
				}
			}
		}
	}
	.js-inmobile {
		.worklog-list {
			.worklog-list__item {
				margin-bottom:0.2rem;
				a {
					font-size: 0.48em;
				}
			}
		}
	}
</style>