<template>
	<section class="article-content-page wrap-box">
		<transition name="fadeInOut">
			<article class="issues-content" v-if="($route.name === 'article-content' || 'worklog-content') && issuesInfo">
				<div class="article-labels">
					<router-link class="article-label" :class="'label-' + label.color" :to="{name: 'label-article-list', params: {labelName: label.name}}" v-for="label in issuesInfo.labels">{{ label.name }}</router-link>
				</div>
				<h2 class="issues-content__title"><a href="javascript:;">{{ issuesInfo.title }}</a></h2>
				<p class="issues-content__time">CREATED AT {{ issuesInfo.createdAt }} _ UPDATED AT {{ issuesInfo.updatedAt }}</p>
				<div class="issues-content__con" v-html="issuesInfo.body"></div>
			</article>
		</transition>
		<div class="end-mark" v-if="issuesInfo"></div>
		<transition name="fadeInOut">
			<div class="issues-comments" v-if="issuesInfo">
				<p>
					<a :href="issuesInfo.html_url" style="color: #f60;">去 Github 发表评论</a>
				</p>
				<dl v-if="commentsInfo.list.length">
					<dd class="issues-comments__item" v-for="comment in commentsInfo.list">
						<a class="issues-comments__item-avator" v-if="!inMobile" :href="comment.html_url">
							<img :src="comment.user.avatar_url" alt="头像">
						</a>
						<div class="issues-comments__item-header">
							<a :href="comment.html_url"><strong>{{ comment.user.login }}</strong></a>
							<span class="issues-comments__item-created">commented on {{ comment.createdAt }}</span>
						</div>
						<article class="issues-comments__item-main" v-html="comment.body"></article>
					</dd>
				</dl>
				<div class="issues-comments__more-wrap" v-if="commentsInfo.list.length">
					<transition name="zoomInOut">
						<p class="issues-comments__more-box" v-show="commentsInfo.list.length && commentsInfo.hasMore && showMoreBtn">
							<a class="issues-comments__more transition-color-btn" href="javascript:;" @click="getMoreComments">更多评论</a>
						</p>
					</transition>
					<transition name="zoomInOut">
						<p class="center-prompt-message" v-show="commentsInfo.list.length && !commentsInfo.hasMore">没有更多的评论</p>
					</transition>
				</div>
				<p class="center-prompt-message" v-if="issuesInfo && !commentsInfo.list.length">还没有小伙伴发言 ... </p>
			</div>
		</transition>
	</section>
</template>

<script>
	import app, {cache,setNecessaryAttribute} from '../blog.js'
	const perPage = 30 // 每页评论内容数量
	let _cache = cache // 缓存
	let reposType = null // 仓库类型
	let issuesNum = null // issues number 标识
	export default {
		data() {
			return {
				issuesInfo: null,
				commentsInfo: null,
				showMoreBtn: true,
				inMobile: window.lib.inMobile
			}
		},
		created() {
			window.scrollTo(0, 0)
			issuesNum = +this.$route.params.num
			this.$route.name === 'article-content' ? reposType = 'blog' : reposType = 'worklog'

			// 从缓存内获取文章信息
			let cacheIssuesRepos = _cache.issues[reposType]
			if(Object.keys(cacheIssuesRepos)) {
				for(let key in cacheIssuesRepos) {
					for(let i = cacheIssuesRepos[key].list.length - 1; i >= 0; i--) {
						if(cacheIssuesRepos[key].list[i].number === issuesNum) {
							this.issuesInfo = cacheIssuesRepos[key].list[i]
							_cache.comments[this.issuesInfo.id] ? this.commentsInfo = _cache.comments[this.issuesInfo.id] : this.initCommentsInfo()
							return
						}
					}
				}
			}
			this.$emit('set-loader-state', true)
			// 获取当前文章信息
			this.$http.get(app.host + 'repos/' + app.owner + '/' + (app[reposType + 'Repos']) + '/issues/' + issuesNum, {
				params: {
					access_token: app.access_token
				}
			}).then((response) => {
				// 设置文章所需内容
				this.issuesInfo = setNecessaryAttribute(response.data, 'issues')
				// 获取评论信息
				_cache.comments[this.issuesInfo.id] ? this.commentsInfo = _cache.comments[this.issuesInfo.id] : this.initCommentsInfo()
				this.$emit('set-loader-state', false)
			})
		},
		methods: {
			initCommentsInfo() {
				// 初始化评论信息
				this.commentsInfo = {
					list: [],
					page: 1,
					hasMore: true
				}
				this.getCommentsInfo()
			},
			getCommentsInfo() {
				// 获取评论信息
				// this.$http.get('https://api.github.com/repos/lifesinger/blog/issues/184/comments?page=1&per_page=30', {
				this.$http.get(this.issuesInfo.comments_url, {
					params: {
						page: this.commentsInfo.page,
						per_page: perPage,
						access_token: app.access_token
					}
				}).then((response) => {
					if(!this.showMoreBtn) this.showMoreBtn = true
					if(!_cache.comments[this.issuesInfo.id]) _cache.comments[this.issuesInfo.id] = this.commentsInfo // 添加评论缓存
					if(!response.data.length) return(this.commentsInfo.hasMore = false)
					this.commentsInfo.list = this.commentsInfo.list.concat(setNecessaryAttribute(response.data, 'comments'))
					this.commentsInfo.page += 1
					if(response.data.length < perPage) this.commentsInfo.hasMore = false
				})
			},
			getMoreComments() {
				this.showMoreBtn = false
				this.getCommentsInfo()
			}
		}
	}
</script>