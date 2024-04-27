import { defu } from 'defu'
import { createI18n } from 'vue-i18n'

const yamls = import.meta.glob('../../locales/*/**.y(a)?ml', {
	eager: true,
})

const languages = Object.entries(yamls).map(([key, value]) => {
	const yaml = key.endsWith('.yaml')
	key = key.slice(14, yaml ? -5 : -4)
	// 如果有子模块，则分割
	if (key.includes('/')) {
		key = key.split('/')[0]
	}
	// @ts-ignore
	return { [key]: value.default }
})

const messages = defu({}, ...languages)
const languagesArray = ref([
	{ type: 'ja', name: '日本語' },
	{ type: 'en', name: 'English' },
	{ type: 'th', name: 'ภาษาไทย' },
	{ type: 'zh-cn', name: '繁体中文' },
	{ type: 'ma', name: 'Malay' },
]);
// const storageLocale: any = ref(useStorage('locale', 'zh-hk'))
let locale: any;
if (!localStorage.getItem('lemon_web_lang')) {
	let initLang = '';
	let userLang = window.navigator.language;
	if (userLang.indexOf('zh') !== -1) {
		initLang = 'zh-cn';
		locale = '繁體中文'
	} else if (userLang.indexOf('ja') !== -1) {
		initLang = 'ja';
		locale = '日本語'
	} else if (userLang.indexOf('th') !== -1) {
		initLang = 'th';
		locale = 'ภาษาไทย'
	} else if (userLang.indexOf('en') !== -1) {
		initLang = 'en';
		locale = 'English'
	} else if (userLang.indexOf('ma') !== -1) {
		initLang = 'ma';
		locale = 'Malay'
	} else {
		initLang = 'en';
	}
	// setLang(initLang);
	localStorage.setItem('lemon_web_lang', locale);
	locale = locale;
	// language.value = languagesArray.value.find((item) => item.type === initLang)?.name;
}
// if (!window.localStorage.getItem('lang')) {
// 	window.localStorage.setItem('lang', 'en');
// }
// window.localStorage 中的 locale，第二个参数为默认值
// https://vueuse.org/core/useStorage/#usestorage
console.log(languages)
export const i18n = createI18n({
	messages,
	legacy: false,
	globalInjection: true,
	allowComposition: true,
})

// 同步本地 window.localStorage 和 i18n
// https://vueuse.org/shared/syncRef/#syncref
// syncRef(storageLocale, i18n.global.locale)
i18n.global.locale.value = locale || localStorage.getItem('lemon_web_lang') || 'English';
export default i18n
