import Tov from './presets'
import { defineConfig } from 'vite'

export default defineConfig({
	plugins: [Tov()],
	server: {
		port: 5173,
		open: true,
		proxy: {
			'/api': {
				target: 'http://8.218.221.95:18001',
				changeOrigin: true,
				configure: (proxy) => {
					proxy.on('proxyReq', function (proxyReq, req, res, options) {
						// proxyReq.setHeader('cookie', cookie);
					})
				},
			},
		},
	},
})
