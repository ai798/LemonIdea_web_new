<template>
  <div class="content" v-html="content"></div>
</template>

<script lang="ts" setup>
import { getUserPrivacy } from "@/api/index";
import { useUserStore } from "@/store/modules/user";
const userStore = useUserStore();
const content = ref();
getUserPrivacy(userStore.getLang).then((res) => {
  content.value = res;
});
</script>

<style lang="scss" scoped>
.content {
  height: 100%;
  width: 100%;
  padding: 0;
}
</style>
