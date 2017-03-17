<template>
  <section class="article-list-page wrap-box">
    <transition-group name="fadeInOut" tag="ul" style="padding: 0; margin: 0;">
      <li class="article-list__item dashed dashed-thin dashed-bottom" v-for="article in articleListInfo.list" :key="article.id">
        <article>
          <div class="article-labels">
            <router-link class="article-label" :class="'label-' + label.color" :to="{name: 'label-article-list', params: {labelName: label.name}}" v-for="label in article.labels">{{ label.name }}</router-link>
          </div>
          <h2 class="issues-content__title">
            <router-link :to="{name: 'article-content', params: { num: article.number }}">{{ article.title }}</router-link>
          </h2>
          <p class="issues-content__time">CREATED AT {{ article.createdAt }} _ UPDATED AT {{ article.updatedAt }}</p>
          <div class="issues-content__con issues-content__hid" v-html="article.quote"></div>
          <router-link class="article-list__read transition-color-btn" :to="{name: 'article-content', params: { num: article.number}}">READ</router-link>
        </article>
      </li>
    </transition-group>
    <div class="article-list__more-wrap">
      <transition name="zoomInOut">
        <p class="article-list__more-box" v-show="articleListInfo.list.length && articleListInfo.hasMore && showMoreBtn">
          <button class="article-list__more transition-color-btn" type="button" @click="getMoreArticle">MORE</button>
        </p>
      </transition>
      <transition name="zoomInOut">
        <p class="article-list__no-more center-prompt-message" v-show="articleListInfo.list.length && !articleListInfo.hasMore">没有更多的文章</p>
      </transition>
    </div>
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

