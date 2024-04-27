// import { createGetRoutes, setupLayouts } from 'virtual:meta-layouts'
// import { routes as fileRoutes } from 'vue-router/auto/routes'
import routes from './routerslist'
import { createRouter, createWebHistory, createMemoryHistory } from 'vue-router';
console.log('is SSR', import.meta.env.SSR);
declare module 'vue-router' {
	// 在这里定义你的 meta 类型
	// eslint-disable-next-line no-unused-vars
	interface RouteMeta {
		title?: string
		layout?: string
	}
}

// 重定向 BASE_URL
// fileRoutes.flat(Infinity).forEach((route) => {
// 	route.path = safeResolve(route.path)
// })

export const router = createRouter({
	// history: import.meta.env.SSR ? createMemoryHistory() : createWebHistory(),
	history: createWebHistory(),
	routes: routes,
});
//注意路由守卫只有在浏览器端可用，如果服务端用会报错
if (!import.meta.env.SSR) {
	router.beforeEach((to, from, next) => {
		if (to.matched.length > 0) {
			//有匹配路径
			next();
		} else {
			//没有匹配路径
			next('/error');
		}
	});

	router.afterEach((to) => {
		if (to.meta?.title) {
			document.title = to.meta.title;
		}
	});
}


// export const getRoutes = createGetRoutes(router)

export default router
