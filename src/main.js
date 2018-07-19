// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import Home from './components/home.vue'
import Article from './components/Article.vue'
import ArticleList from './components/Article-List.vue'
import ArticleContent from './components/Article-content.vue'
import Worklog from './components/Worklog.vue'
import WorklogList from './components/Worklog-List.vue'

Vue.use(ElementUI)
Vue.use(VueRouter)
Vue.use(VueResource)
/* eslint-disable no-new */
const routes = [{
		path: '/',
		component: Home
	},
	{
		path: '/article',
		component: Article,
		children: [{
				path: '',
				name: 'article-list',
				component: ArticleList
			},
			{
				path: ':num',
				name: 'article-content',
				component: ArticleContent
			},
			{
				path: 'label/:labelName',
				name: 'label-article-list',
				component: ArticleList
			}
		]
	},
	{
		path: '/worklog',
		component: Worklog,
		children: [{
				path: '',
				name: 'worklog-list',
				component: WorklogList
			},
			{
				path: ':num',
				name: 'worklog-content',
				component: ArticleContent
			}
		]
	}
]

const router = new VueRouter({
	routes // === routes: routes
})

new Vue({
	router,
	render: h => h(App)
}).$mount('#app')