<template>
<section class="article-content-page">
    <transition name="fadeInOut">
      <article class="issues-content" v-if="($route.name === 'article-content' || 'worklog-content') && issuesInfo">
        <div class="article-labels">
          <router-link class="article-label" :class="'label-' + label.color" :to="{name: 'label-article-list', params: {labelName: label.name}}" v-for="label in issuesInfo.labels">{{ label.name }}</router-link>
        </div>
        <h2 class="issues-content__title"><a href="javascript:;">{{ issuesInfo.title }}</a></h2>
        <p class="issues-content__time">CREATED AT {{ issuesInfo.createdAt }} _ UPDATED AT {{ issuesInfo.updatedAt }}</p>
        <div v-html="issuesInfo.body"></div>
      </article>
    </transition>
    <div class="end-mark" v-if="issuesInfo"></div>
    <transition name="fadeInOut">
      <div class="issues-comments" v-if="issuesInfo">
        <p><a :href="issuesInfo.html_url" style="color: #f60;">去 Github 发表评论</a></p>
        <dl v-if="commentsInfo.list.length">
          <dd class="issues-comments__item" v-for="comment in commentsInfo.list">
            <a class="issues-comments__item-avator" v-if="!inMobile" :href="comment.html_url">
              <img :src="comment.user.avatar_url" alt="头像">
            </a>
            <div class="issues-comments__item-header">
              <a :href="comment.html_url"><strong>{{comment.user.login}}</strong></a>
              <span class="issues-comments__item-created">commented on {{comment.createdAt}}</span>
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
  import app, {cache, setNecessaryAttribute} from '../blog.js'

  const perPage = 5       // 每页文章数量
  let _cache = cache      // 缓存
  let issuesLabel = null  // issues 标签

  // 获取初始化文章列表信息
  let getInitArticleListInfo = () => {
    return {
      list: [],
      page: 1,
      hasMore: true
    }
  }

  export default {
    data () {
      return {
        articleListInfo: getInitArticleListInfo(),
        showMoreBtn: true
      }
    },
    created () {
      this.fetchData()
    },
    watch: {
      '$route': 'fetchData'
    },
    methods: {
      fetchData () {
        // issues 标签
        this.$route.name === 'article-list' ? issuesLabel = 'all' : issuesLabel = this.$route.params.labelName

        // 有缓存则从缓存内取出文章信息
        // 没有则初始化并从接口获取文章信息
        if (_cache.issues.blog[issuesLabel]) {
          this.articleListInfo = _cache.issues.blog[issuesLabel]
        } else {
          _cache.issues.blog[issuesLabel] = this.articleListInfo = getInitArticleListInfo()
          this.$emit('set-loader-state', true)
          this.getBlogIssues()
        }
      },
      getMoreArticle () {
        this.showMoreBtn = false
        this.getBlogIssues()
      },
      getBlogIssues () {
        // 获取文章列表
        this.$http.get(app.host + 'repos/' + app.owner + '/' + app.blogRepos + '/issues', {
          params: {
            filter: 'created',
            labels: issuesLabel === 'all' ? null : issuesLabel,
            page: this.articleListInfo.page,
            per_page: perPage,
            access_token: app.access_token
          }
        }).then((response) => {
          // 更新视图状态
          this.$emit('set-loader-state', false)
          if (!this.showMoreBtn) this.showMoreBtn = true

          // 更新数据、设置文章所需内容
          if (!response.data.length) return (this.articleListInfo.hasMore = false)

          this.articleListInfo.list = this.articleListInfo.list.concat(setNecessaryAttribute(response.data, 'issues'))
          this.articleListInfo.page += 1

          if (response.data.length < perPage) this.articleListInfo.hasMore = false
        })
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.wrap-box{background: #fff;height: 100%;}
</style>
