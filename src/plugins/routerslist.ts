export const routes = [
	{
		path: '/',
		component: () => import('@/components/Navigation.vue'),
		children: [
			{
				path: '/',
				component: () => import('@/components/MainPage.vue'),
				meta: {
					title: 'lemonaidea',
					keepAlive: true,
				},
			},
			//内容页
			{
				name: 'title_paraphrasing',
				path: `/:lang/title_paraphrasing`,
				component: () => import('@/components/content/index.vue'),
				children: [
					{
						// 当 /user/:id/profile 匹配成功
						// UserProfile 将被渲染到 User 的 <router-view> 内部
						path: 'en',
						component: () => import('@/components/content/index.vue'),
					},
					{
						// 当 /user/:id/posts 匹配成功
						// UserPosts 将被渲染到 User 的 <router-view> 内部
						path: 'ja',
						component: () => import('@/components/content/index.vue'),
					},
					{
						// 当 /user/:id/posts 匹配成功
						// UserPosts 将被渲染到 User 的 <router-view> 内部
						path: 'th',
						component: () => import('@/components/content/index.vue'),
					},
					{
						// 当 /user/:id/posts 匹配成功
						// UserPosts 将被渲染到 User 的 <router-view> 内部
						path: 'zh-cn',
						component: () => import('@/components/content/index.vue'),
					},
					{
						// 当 /user/:id/posts 匹配成功
						// UserPosts 将被渲染到 User 的 <router-view> 内部
						path: 'ma',
						component: () => import('@/components/content/index.vue'),
					},
				],
				meta: {
					title: 'TitleParaphrasing',
					border: false,
				},
			},
			{
				name: 'bodyText_paraphrasing',
				path: '/:lang/bodyText_paraphrasing',
				component: () => import('@/components/content/index.vue'),
				children: [
					{
						// 当 /user/:id/profile 匹配成功
						// UserProfile 将被渲染到 User 的 <router-view> 内部
						path: 'en',
						component: () => import('@/components/content/index.vue'),
					},
					{
						// 当 /user/:id/profile 匹配成功
						// UserProfile 将被渲染到 User 的 <router-view> 内部
						path: 'ja',
						component: () => import('@/components/content/index.vue'),
					},
					{
						// 当 /user/:id/profile 匹配成功
						// UserProfile 将被渲染到 User 的 <router-view> 内部
						path: 'th',
						component: () => import('@/components/content/index.vue'),
					},
					{
						// 当 /user/:id/profile 匹配成功
						// UserProfile 将被渲染到 User 的 <router-view> 内部
						path: 'zh-cn',
						component: () => import('@/components/content/index.vue'),
					},
					{
						// 当 /user/:id/profile 匹配成功
						// UserProfile 将被渲染到 User 的 <router-view> 内部
						path: 'ma',
						component: () => import('@/components/content/index.vue'),
					},
				],
				meta: {
					title: 'BodyTextParaphrasing',
					border: false,
				},
			},
			{
				name: 'title_optimization',
				path: '/:lang/title_optimization',
				children: [
					{
						// 当 /user/:id/profile 匹配成功
						// UserProfile 将被渲染到 User 的 <router-view> 内部
						path: 'en',
						component: () => import('@/components/content/index.vue'),
					},
					{
						// 当 /user/:id/profile 匹配成功
						// UserProfile 将被渲染到 User 的 <router-view> 内部
						path: 'th',
						component: () => import('@/components/content/index.vue'),
					},
					{
						// 当 /user/:id/profile 匹配成功
						// UserProfile 将被渲染到 User 的 <router-view> 内部
						path: 'ja',
						component: () => import('@/components/content/index.vue'),
					},
					{
						// 当 /user/:id/profile 匹配成功
						// UserProfile 将被渲染到 User 的 <router-view> 内部
						path: 'zh-cn',
						component: () => import('@/components/content/index.vue'),
					},
					{
						// 当 /user/:id/profile 匹配成功
						// UserProfile 将被渲染到 User 的 <router-view> 内部
						path: 'ma',
						component: () => import('@/components/content/index.vue'),
					},
				],
				component: () => import('@/components/content/index.vue'),
				meta: {
					title: 'TitleOptimization',
					border: false,
				},
			},
			{
				name: 'bodyText_optimization',
				path: '/:lang/bodyText_optimization',
				children: [
					{
						// 当 /user/:id/profile 匹配成功
						// UserProfile 将被渲染到 User 的 <router-view> 内部
						path: 'en',
						component: () => import('@/components/content/index.vue'),
					},
					{
						// 当 /user/:id/profile 匹配成功
						// UserProfile 将被渲染到 User 的 <router-view> 内部
						path: 'th',
						component: () => import('@/components/content/index.vue'),
					},
					{
						// 当 /user/:id/profile 匹配成功
						// UserProfile 将被渲染到 User 的 <router-view> 内部
						path: 'ja',
						component: () => import('@/components/content/index.vue'),
					},
					{
						// 当 /user/:id/profile 匹配成功
						// UserProfile 将被渲染到 User 的 <router-view> 内部
						path: 'zh-cn',
						component: () => import('@/components/content/index.vue'),
					},
					{
						// 当 /user/:id/profile 匹配成功
						// UserProfile 将被渲染到 User 的 <router-view> 内部
						path: 'ma',
						component: () => import('@/components/content/index.vue'),
					},
				],
				component: () => import('@/components/content/index.vue'),
				meta: {
					title: 'BodyTextOptimization',
					border: false,
				},
			},
		],
	},
	//登录页
	{
		path: '/login',
		component: () => import('@/components/Login.vue'),
		meta: {
			title: 'lemonaidea',
			keepAlive: true,
		},
	},
	//邀请注册页
	{
		name: 'register',
		path: '/:inviteId',
		component: () => import('@/components/Register.vue'),
		meta: {
			title: 'register',
			keepAlive: true,
		},
	},
	//注册页
	{
		path: '/register',
		component: () => import('@/components/Register.vue'),
		meta: {
			title: 'lemonaidea',
			keepAlive: true,
		},
	},
	//隐私政策
	{
		path: '/privacy',
		component: () => import('@/components/privacy/privacy.vue'),
		meta: {
			title: 'lemonaidea',
			keepAlive: true,
		},
	},
	{
		// 找不到路由重定向到404页面
		path: '/:pathMatch(.*)',
		redirect: '/',
	},
]

export default routes
