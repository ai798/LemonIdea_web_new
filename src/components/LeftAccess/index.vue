<template>
  <p :class="[leftAccess === 0 ? 'zero' : '', 'left']">{{ $t('lemonaidea_tips_chance') }} {{ leftAccess }} {{ $t('lemonaidea_tips_chance_two') }}</p>
</template>

<script lang="ts" setup>
import { useUserStore } from "@/store/modules/user";

const userStore = useUserStore();
const versionType = ref(3.5);
const leftAccess = ref(5);
onMounted(() => {
  leftAccess.value = 5;
  userStore.setProfile();
});
const judgeType = (type: any) => {
  if (type == 3.5) {
    leftAccess.value =
      userStore.getProfile.account?.daily_35_valid_times -
      userStore.getProfile.account?.daily_35_used_times;
  } else if (type == 4.0) {
    leftAccess.value =
      userStore.getProfile.account?.daily_40_invited_valid_times -
      userStore.getProfile.account?.daily_40_invited_used_times;
  }
};
watch(
  () => userStore.getModel,
  (val) => {
    if (val == 3.5) {
      versionType.value = 3.5;
      judgeType(versionType.value);
    } else if (val == 4.0) {
      versionType.value = 4.0;
      judgeType(versionType.value);
    }
  },
  {
    immediate: true,
  }
);
watch(
  () => userStore.getProfile,
  (profile) => {
    judgeType(versionType.value);
    // console.log('userStore.getProfile', val);
  }
);
judgeType(versionType.value);
</script>

<style lang="scss" scoped>
.left {
  color: #295c20;
  font-family: Poppins;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 12px; /* 75% */
}
.zero {
  color: #8b2221;
}
</style>
