<template>
  <section class="worklog-list-page wrap-box">
  	<h1>工作日志</h1>
    <transition-group class="worklog-list" name="fadeInOut" tag="ul" v-if="worklogListInfo.list.length">
      <li class="worklog-list__item" v-for="worklog in worklogListInfo.list" :key="worklog.id">
        <router-link :to="{name: 'worklog-content', params: { num: worklog.number }}">{{ worklog.title }}</router-link>
      </li>
    </transition-group>
  </section>
</template>

<script>
  import app, {cache, setNecessaryAttribute} from '../blog.js'
  const perPage = 30  // 每页工作日志数量
  let _cache = cache  // 缓存
  // 获取初始化工作日志列表信息
  let getInitWorklogListInfo = () => {
    return {
      list: [],
      page: 1,
      hasMore: true
    }
  }
  export default {
    mounted () {
      // 有缓存则从缓存内取出工作日志信息
      // 没有则初始化并从接口获取工作日志信息
      if (_cache.issues[app.worklogRepos].all) {
        this.worklogListInfo = _cache.issues[app.worklogRepos].all
      } else {
        _cache.issues[app.worklogRepos].all = this.worklogListInfo = getInitWorklogListInfo()
        this.$emit('set-loader-state', true)
        this.getWorklogList()
      }
    },
    data () {
      return {
        worklogListInfo: getInitWorklogListInfo()
      }
    },
    methods: {
      getWorklogList () {
        this.$http.get(app.host + 'repos/' + app.owner + '/' + app.worklogRepos + '/issues', {
          params: {
            filter: 'created',
            page: this.worklogListInfo.page,
            per_page: perPage,
            access_token: app.access_token
          }
        }).then((response) => {
          this.$emit('set-loader-state', false)
          this.worklogListInfo.list = this.worklogListInfo.list.concat(setNecessaryAttribute(response.data, 'issues'))
          this.worklogListInfo.page += 1
        })
      }
    }
  }
</script>