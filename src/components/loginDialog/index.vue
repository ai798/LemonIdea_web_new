<template>
  <div class="login_dialog">
    <el-dialog
      pop-class="tips_unlock"
      v-model="showLoginDialog"
      closeable
      :title="titleSpan"
      close-icon-position="top-right"
    >
      <template #close-icon
        ><img style="width: 24px; height: 24px" src="@/assets/close.png" alt="" />
      </template>
      <div class="margin-btn">
        <p class="tips-unlock-span">{{ $t("lemonaidea_invite_alert_desc") }}</p>
        <p class="tips-unlock-span">
          {{ $t("lemonaidea_invite_alert_desc_one")
          }}<span class="money">{{ $t("lemonaidea_invite_alert_desc_one_money") }}</span>
        </p>
        <p class="tips-unlock-span">{{ $t("lemonaidea_invite_alert_desc_two") }}</p>
        <div class="line_box">
          <p>{{ $t("lemonaidea_invite_desc_one") }}</p>
          <a :href="`${origin}/${userStore.getProfile.invite?.invite_code ?? ''}`">{{
            `${origin}/${userStore.getProfile.invite?.invite_code ?? ""}`
          }}</a>
        </div>
      </div>
      <el-button
        class="confirm_copy"
        type="default"
        @click="handleTips(`${origin}/${userStore.getProfile.invite?.invite_code ?? ''}`)"
        >{{
          userStore.getToken
            ? $t("lemonaidea_invite_copy")
            : $t("limit_free.lemonaidea_limited_free_btn")
        }}</el-button
      >
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import { useUserStore } from "@/store/modules/user";
import { timestamp, useClipboard } from "@vueuse/core";
import { ElMessage } from "element-plus";
import { useI18n } from "vue-i18n";
import emitter from "@/utils/mitt";
const { t } = useI18n();
const { copy } = useClipboard({ legacy: true });
const userStore = useUserStore();
const showLoginDialog = ref(false);

const origin = computed(() => {
  return window.location.origin;
});

const handleTips = (url) => {
  copy(`${t("lemonaidea_invite_desc")} ${url} ${t("lemonaidea_invite_desc_left")}`);
  ElMessage({
    message: t("lemonaidea_toast_copy_success"),
    type: "success",
    plain: true,
  });
  // showToast(t("fun_opt_title.lemonaidea_toast_copy_success"));
  showLoginDialog.value = !showLoginDialog.value;
};
const titleSpan = computed(() => {
  return userStore.getToken ? t("lemonaidea_invite_title") : "💡 TIPS";
});
const handleShowLoginDialog = () => {
  showLoginDialog.value = true;
};
emitter.on("showLoginDialog", handleShowLoginDialog);
</script>

<style lang="scss" scoped>
.login_dialog {
  .tips_unlock {
    width: 590px;
    height: 381px;
    flex-shrink: 0;
    border-radius: 24px;
    background: #fff;
    box-shadow: 0px 2px 2px 0px rgba(0, 0, 0, 0.05);
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
  .money {
    color: #7730d0;
    font-family: Poppins;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 32px;
  }
  .confirm_copy {
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
    border: none;
    margin: 24px;
  }
  .line_box {
    width: 513px;
    height: 101px;
    flex-shrink: 0;
    border-radius: 16px;
    background: rgba(119, 48, 208, 0.1);
    display: flex;
    flex-direction: column;
    align-content: center;
    align-items: center;
    justify-content: center;
    color: #1d2331;
    text-align: center;
    font-family: Poppins;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    margin-top: 16px;
    a {
      color: #1454ff;
      text-align: center;
      font-family: Poppins;
      font-size: 16px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
    }
  }
}
</style>

<style lang="scss">
.login_dialog {
  .el-dialog {
    border-radius: 24px;
    background: #fff;
    box-shadow: 0px 2px 2px 0px rgba(0, 0, 0, 0.05);
    width: 590px;
    min-height: 381px;
    flex-shrink: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .el-dialog__body {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
}
</style>
