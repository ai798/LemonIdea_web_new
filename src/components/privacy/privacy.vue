<template>
	<div class="content" v-html="content"></div>
</template>

<script lang="ts" setup>
import { getUserPrivacy } from '@/api/index'
import { useUserStore } from '@/store/modules/user'
import { useHead } from '@unhead/vue'
const { locale, t } = useI18n()
watch(
	() => locale.value,
	(val) => {
		console.log(val)
		useHead({
			title: t('lemonidea_privacy_title'),
			meta: [
				{
					name: 'description',
					content: t('lemonidea_privacy_description'),
				},
			],
		})
	},
	{ immediate: true },
)
useHead({
	title: t('lemonidea_privacy_title'),
	meta: [
		{
			name: 'description',
			content: t('lemonidea_privacy_description'),
		},
	],
})
const userStore = useUserStore()
const content = ref()
getUserPrivacy(userStore.getLang).then((res) => {
	content.value = res
})
</script>

<style lang="scss" scoped>
.content {
	height: 100%;
	width: 100%;
	padding: 0;
}
</style>
