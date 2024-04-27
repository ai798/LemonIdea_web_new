// https://unocss.dev/ 原子 css 库
import '@unocss/reset/tailwind-compat.css' // unocss reset
import 'virtual:uno.css'
import 'virtual:unocss-devtools'
import vue3GoogleLogin from 'vue3-google-login'
// 你自定义的 css
import './styles/main.css'
import 'element-plus/dist/index.css'
import router from './plugins/router'
import App from './App.vue'
const option = {
	// 717982749973-o0cr10k4e5f7so0nb2rp0u2kjeum8278.apps.googleusercontent.com
	clientId:
		'717982749973-o0cr10k4e5f7so0nb2rp0u2kjeum8278.apps.googleusercontent.com',
	scope: 'proflie email',
}

const app = createApp(App)
app.use(vue3GoogleLogin, option)
app.use(router)

app.mount('#app')
