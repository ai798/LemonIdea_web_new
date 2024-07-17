<script setup lang="ts">
import { vOnClickOutside } from '@vueuse/components'
import { useUserStore } from '@/store/modules/user'
const userStore = useUserStore()
const langs = ['English', 'ภาษาไทย', '日本語', '繁體中文', 'Malay']
const visiable = ref(false)
const { locale, t } = useI18n()
function dropdownHandler() {
	visiable.value = false
}

const props = withDefaults(
	defineProps<{
		options: Array<any>
	}>(),
	{
		options: [] as any,
	},
)
const currentTone = ref(props.options[0].label)
watch(
	() => userStore.getLang,
	(val) => {
		if (val) {
			currentTone.value = props.options[0].label
			console.log(val)
		}
	},
	{ immediate: true },
)
const emits = defineEmits(['handle-change'])

const handleChangeTone = (tone: any) => {
	currentTone.value = tone.label
	emits('handle-change', tone)
	visiable.value = false
}
// const handleChangeLocal = (lang: any) => {
// 	let locals: any = ''
// 	if (lang === langs[0]) {
// 		locals = 'en'
// 	} else if (lang === langs[1]) {
// 		locals = 'th'
// 	} else if (lang === langs[2]) {
// 		locals = 'ja'
// 	} else if (lang === langs[3]) {
// 		locals = 'zh-hk'
// 	} else if (lang === langs[4]) {
// 		locals = 'ma'
// 	}
// 	userStore.setLang(locals)
// 	locale.value = lang
// 	visiable.value = false
// 	window.localStorage.setItem('lemon_web_lang', lang)
// }
</script>

<template>
	<div class="relative-dropdownbox-tone">
		<div class="inline-flex items-center overflow-hidden rounded-md">
			<button
				class="h-full cursor-pointer border-0 bg-white p-2 text-gray-600"
				dark="bg-transparent hover:bg-gray-500"
				:class="visiable ? 'bg-gray-200 bg-gray-500' : ''"
				@click.stop="visiable = !visiable"
			>
				<p>{{ t(currentTone) }}</p>

				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-4 w-4"
					viewBox="0 0 20 20"
					fill="currentColor"
				>
					<path
						fill-rule="evenodd"
						d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
						clip-rule="evenodd"
					/>
				</svg>
			</button>
		</div>

		<Transition name="fade" mode="out-in">
			<div
				v-if="visiable"
				v-on-click-outside.bubble="dropdownHandler"
				dark="bg-gray-500"
				class="absolute end-0 z-10 mt-2 rounded-md bg-white shadow-lg divide-y divide-gray-100"
			>
				<div class="options">
					<span
						v-for="tone of options"
						:key="tone.value"
						:class="
							currentTone === tone.label
								? 'bg-gray-100 text-gray-800 dark:bg-gray-400'
								: ''
						"
						class="block cursor-pointer rounded-lg px-4 py-2 text-sm text-gray-500"
						dark="text-light-500"
						@click="handleChangeTone(tone)"
					>
						{{ t(tone.label) }}
					</span>
				</div>
			</div>
		</Transition>
	</div>
</template>
<style lang="scss" scoped>
.relative-dropdownbox-tone {
	position: relative;
	border-radius: 16px;
	border: 1px solid #e0e2da;
	height: 48px;
	flex-shrink: 0;
	align-self: stretch;
	width: 274px;
	.h-full {
		flex-direction: row;
		align-items: center;
		width: 274px;
		height: 48px;
		display: flex;
		justify-content: space-between;
		p {
			font-family: Poppins;
			font-size: 14px;
			font-weight: 400;
			line-height: 20px;
			letter-spacing: 0em;
			text-align: left;
		}
	}
	.h-4,
	.w-4 {
		width: 1rem;
		height: 1rem;
	}
	.options {
		width: 108px;
		top: 64px;
		left: 1258px;
		padding: 8px;
		border-radius: 6px;
		display: flex;
		width: 272px;
		padding: 4px;
		flex-direction: column;
		align-items: flex-start;
		gap: 2px;
		background-color: #fff;
		span {
			display: flex;
			height: 48px;
			padding: 3px 8px 3px 12px;
			align-items: center;
			gap: 8px;
			align-self: stretch;
			border-radius: 16px;
		}
	}
}
</style>
<style lang="scss">
.relative-dropdownbox-tone {
	.bg-gray-500,
	.dark .dark\:bg-gray-500,
	.dark [dark~='bg-gray-500'] {
		overflow: hidden;
	}
	.dark [dark~='text-light-500'],
	.text-light-500 {
		color: #1d2331;
		text-overflow: ellipsis;
		font-family: Poppins;
		font-size: 14px;
		font-style: normal;
		font-weight: 400;
		line-height: 20px; /* 142.857% */
	}
	.dark .\.dark\:bg-gray-400,
	.dark .dark\:bg-gray-400 {
		border-radius: 3px;
		background: #e9edf5;
	}
	.text-gray-500:hover {
		border-radius: 3px;
		background: #f3f3f3;
	}
}
</style>
