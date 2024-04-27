<template>
  <div class="tab">
    <div class="option_tab">
      <div
        @click="handleSelectTab(1)"
        :class="['op_box', 'margin-left-16', currentTab === 1 ? 'active_box' : '']"
      >
        GPT 3.5
      </div>
      <div
        @click="handleSelectTab(2)"
        :class="['op_box', currentTab === 2 ? 'active_box' : '']"
      >
        GPT 4.0
      </div>
    </div>
    <!--- 提示弹窗 --->
    <el-dialog v-model="showTips" title="💡Tips">
      <!-- <p class="unlogin_tips-title">
      {{ $t("lemonaidea_login_alert_desc_b") }}
    </p> -->
      <p class="tips_span">
        {{ $t("lemonaidea_login_alert_desc_c") }}
      </p>
      <el-button class="got_it" type="default" @click="handleGoLogin">{{
        $t("lemonaidea_login_alert_btn_go")
      }}</el-button>
      <!-- <p class="cancle" @click="showUnloginToLogin = !showUnloginToLogin">
        {{ $t("cancel") }}
      </p> -->
    </el-dialog>
    <!-- 已登录的tips弹窗--->
    <!-- <LoginDialog></LoginDialog> -->

    <!-- <nut-popup
    pop-class="tips"
    :style="{ padding: '30px 50px' }"
    v-model:visible="showTipsDialog"
  >
    <template #close-icon><img style="width: 24px; height: 24px" src="@/assets/close.png" alt="" /> </template>
    <p class="tips-title">{{ $t("unlogin_tab.lemonaidea_login_alert_desc_a") }}</p>
    <nut-button class="confirm" type="default" @click="$router.push('/login')">{{
      $t("unlogin_tab.lemonaidea_login_alert_btn_go")
    }}</nut-button>
    <p class="cancle" @click="showTipsDialog = !showTipsDialog">{{ $t("btn.cancel") }}</p>
  </nut-popup> -->
  </div>
</template>

<script lang="ts" setup>
import { useUserStore } from "@/store/modules/user";
import { timestamp, useClipboard } from "@vueuse/core";
import { useI18n } from "vue-i18n";
import { ElMessage } from "element-plus";
import { useRouter } from "vue-router";
import emitter from "@/utils/mitt";

const { t } = useI18n();

const router = useRouter();
const { copy } = useClipboard({ legacy: true });
const userStore = useUserStore();
const currentTab = ref(1);
const showTips = ref(false);

const showTipsDialog = ref(false);

const hasLogin = computed(() => {
  return userStore.getToken;
});
onMounted(() => {
  currentTab.value = userStore.getModel === "3.5" ? 1 : 2;
  // userStore.setModel(currentTab.value === 1 ? "3.5" : "4.0");
});
const handleSelectTab = (tab: any) => {
  if (!hasLogin.value && tab == 2) {
    showTips.value = true;
    // emitter.emit('showLoginDialog');
    return;
  }
  // if (window.localStorage.getItem("unlogin_uuid") !== "") {
  //   showTipsDialog.value = true;
  //   return;
  // }
  if (
    hasLogin.value &&
    userStore.getProfile.account?.daily_40_invited_valid_times === 0
  ) {
    // showLoginDialog.value = true;
    emitter.emit("showLoginDialog");
    return;
  }
  currentTab.value = tab;
  userStore.setModel(currentTab.value === 1 ? "3.5" : "4.0");
};

const handleGoLogin = () => {
  showTips.value = !showTips.value;
  router.push("/login");
};
</script>

<style lang="scss" scoped>
.tab {
  .option_tab {
    width: 196px;
    height: 46px;
    flex-shrink: 0;
    border-radius: 14px;
    background: #d9d9d9;
    display: flex;
    flex-direction: row;
    line-height: 92px;
    padding: 4px 4px;
    margin-bottom: 16px;
    justify-content: center;
    .op_box {
      color: #1d2331;
      font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
        Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
      font-style: normal;
      font-weight: 700;
      flex-shrink: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #1d2331;
      font-family: Poppins;
      font-size: 18px;
      font-style: normal;
      font-weight: 700;
      line-height: normal;
      cursor: pointer;
      width: 92px;
    }
    .active_box {
      width: 92px;
      height: 38px;
      flex-shrink: 0;
      border-radius: 12px;
      background: #fff;
    }
  }
  .tips-title {
    color: #1d2331;
    text-align: center;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
      Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
    font-weight: 700;
    font-size: 36px;
    margin-top: 48px;
    margin-bottom: 72px;
  }
  .tips-span {
    font-family: system-ui;
    font-size: 32px;
    font-weight: 400;
    line-height: 48px;
    letter-spacing: 0em;
    padding: 0 32px;
    margin-top: 32px;
  }
  .cancle {
    display: flex;
    width: 622px;
    padding: 10px 26px 10px 26px;
    gap: 10px;
    height: 96px;
    justify-content: center;
    align-items: center;
    color: #909090;
    font-family: Poppins;
    font-size: 36px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
  }
  .confirm {
    width: 622px;
    left: 32px;
    padding: 10px 26px 10px 26px;
    border-radius: 32px;
    gap: 10px;
    height: 96px;
    background-color: #1e232d;
    font-family: system-ui;
    font-size: 32px;
    font-weight: 500;
    line-height: 27px;
    letter-spacing: 0em;
    text-align: left;
    color: #ffffff;
  }
}
.got_it {
  display: flex;
  width: 258px;
  height: 48px;
  padding: 10px 26px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  flex-shrink: 0;
  border-radius: 16px;
  background: #1e232d;
  color: #fff;
  font-family: Poppins;
  font-size: 18px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
}
.tips_span {
  color: #1d2331;
  text-align: center;
  font-family: Poppins;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  margin-bottom: 48px;
}
.tips-unlock-span {
  color: #1d2331;
  font-family: Poppins;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 32px; /* 200% */
  width: 514px;
}

.tips_unlock {
  width: 590px;
  height: 381px;
  flex-shrink: 0;
  border-radius: 24px;
  background: #fff;
  box-shadow: 0px 2px 2px 0px rgba(0, 0, 0, 0.05);
}
</style>
<style lang="scss">
.tips {
  flex-direction: column;
  width: 622px;
  min-height: 336px;
  border-radius: 48px;
  padding: 0 !important;
  justify-content: space-around;
}
.tab {
  .el-dialog {
    border-radius: 24px;
    background: #fff;
    box-shadow: 0px 2px 2px 0px rgba(0, 0, 0, 0.05);
    width: 590px;
    min-height: 381px;
    flex-shrink: 0;
  }
}
</style>
