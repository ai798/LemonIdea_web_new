<template>
  <div class="content">
    <Tab></Tab>
    <div class="options-btn">
      <div
        :class="[
          'opsions',
          select === item ? 'active' : '',
          select === item ? computedCss : '',
        ]"
        v-for="(item, index) in items"
        :key="index"
        @click="handleChange(item)"
      >
        {{ t(item) }}
      </div>
    </div>
    <div :class="['basic-main-box', hasUnder ? 'main-box' : 'main-box-min']">
      <div class="top-box">
        <div class="title-box">
          <img src="@/assets/rectangle.png" alt="" />
          <span>{{ computedSlang }}</span>
        </div>
        <el-input
          v-model="firstInput"
          :autosize="{ minRows: 4, maxRows: 4 }"
          :resize="'none'"
          type="textarea"
          :placeholder="t('lemonaidea_title_imitation_edit_tips_b')"
        />
      </div>
      <div class="bottom-box" v-if="hasUnder">
        <div class="title-box">
          <img src="@/assets/rectangle.png" alt="" />
          <span>{{ t("lemonaidea_title_imitation_edit_tips_c") }}</span>
        </div>
        <el-input
          v-model="secondInput"
          :autosize="{ minRows: 4, maxRows: 4 }"
          :resize="'none'"
          type="textarea"
          :placeholder="t('lemonaidea_title_imitation_edit_tips_d')"
        />
      </div>
      <div class="button-box">
        <LeftAccess />
        <button
          :disabled="!firstInput || isLoading"
          :class="[!firstInput ? 'default' : 'active', isLoading ? 'could-send' : '']"
          @click="handleChat"
        >
          {{ isLoading ? $t("lemonaidea_thinking") : $t("lemonaidea_btn_send") }}
          <img v-if="!firstInput" src="@/assets/arrow-dark.png" />
          <img v-else-if="firstInput && !isLoading" src="@/assets/arrow-white.png" />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            v-if="isLoading"
          >
            <path
              d="M18.5 10C18.5 8.03354 17.8182 6.12775 16.5706 4.60766C15.3231 3.08756 13.587 2.04696 11.6583 1.66333C9.72956 1.27969 7.72746 1.57669 5.99315 2.50367C4.25884 3.43065 2.8996 4.93042 2.14705 6.74719C1.39449 8.56396 1.29518 10.5856 1.86603 12.4674C2.43688 14.3492 3.64258 15.975 5.27767 17.0675C6.91277 18.16 8.87612 18.6518 10.8332 18.4591C12.7902 18.2663 14.6199 17.4009 16.0104 16.0104"
              stroke="white"
              stroke-width="2"
              stroke-linecap="square"
            />
          </svg>
        </button>
      </div>
    </div>
    <Promote
      v-if="resObj.length"
      :source="resObj"
      :oldSource="oldResObj"
      @change="handleReSend"
      :loading="isLoading"
    />
    <!--- 登录弹窗  --->
    <el-dialog
      v-model="showUnloginToLogin"
      :show-close="false"
      :title="$t(`lemonaidea_login_alert_desc_b`)"
    >
      <!-- <p class="unlogin_tips-title">
      {{ $t("lemonaidea_login_alert_desc_b") }}
    </p> -->
      <el-button class="confirm_copy" type="default" @click="handleGoLogin">{{
        $t("lemonaidea_login_alert_btn_go")
      }}</el-button>
      <p class="cancle" @click="showUnloginToLogin = !showUnloginToLogin">
        {{ $t("cancel") }}
      </p>
    </el-dialog>
  </div>
  <!-- <LoginDialog></LoginDialog> -->
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { generate } from "@/api/index";
import { FunctionType } from "@/utils/enum";
import { ElMessage } from "element-plus";
import { useRouter, useRoute } from "vue-router";
import { OptionsType } from "@/utils/enum";
import { useUserStore } from "@/store/modules/user";

import emitter from "@/utils/mitt";

const showUnloginToLogin = ref(false);
// const handleShowUnLoginTips = () => {
//   console.log("sadas");
//   showUnloginToLogin.value = true;
// };
const handleGoLogin = () => {
  // showLeft.value = false;
  showUnloginToLogin.value = false;
  // showTips.value = false;
  router.push("/login");
};
const router = useRouter();
const userStore = useUserStore();
const resObj = ref([] as any);
const oldResObj = ref([] as any);
const { locale, t } = useI18n();
const isLoading = ref(false);
const isDefault = computed(() => firstInput.value);
const select = ref("");
const route = useRoute();
const TYPE: any = ref();
const hasUnder = ref(true);
const firstInput = ref("");
const secondInput = ref("");
const objEle = reactive({
  gen_type: FunctionType.TITLE_PARA,
  title: firstInput.value,
  subject: secondInput.value,
  text: "",
  model_name: userStore.getModel,
});
const judge = () => {
  if (TYPE.value === OptionsType.title_paraphrasing) {
    objEle.gen_type = FunctionType.TITLE_PARA;
    objEle.title = window.localStorage.getItem("title") ?? "";
    objEle.subject = window.localStorage.getItem("subject") ?? "";
    objEle.model_name = userStore.getModel;
  } else if (TYPE.value === OptionsType.bodyText_paraphrasing) {
    objEle.gen_type = FunctionType.BODY_PARA;
    objEle.title = "";
    objEle.text = window.localStorage.getItem("title") ?? "";
    objEle.subject = window.localStorage.getItem("subject") ?? "";
    objEle.model_name = userStore.getModel;
  } else if (TYPE.value === OptionsType.title_optimization) {
    objEle.gen_type = FunctionType.TITLE_OPT;
    objEle.title = window.localStorage.getItem("title") ?? "";
    objEle.model_name = userStore.getModel;
  } else if (TYPE.value === OptionsType.bodyText_optimization) {
    objEle.gen_type = FunctionType.BODY_OPT;
    objEle.title = "";
    objEle.text = window.localStorage.getItem("title") ?? "";
    objEle.subject = window.localStorage.getItem("subject") ?? "";
    objEle.model_name = userStore.getModel;
  }
};
const computedSlang = computed(() => {
  if (TYPE.value === OptionsType.title_paraphrasing) {
    return t("lemonaidea_title_imitation_edit_tips_a");
  } else if (TYPE.value === OptionsType.bodyText_paraphrasing) {
    return t("lemonaidea_text_imitation_edit_tips_a");
  } else if (TYPE.value === OptionsType.title_optimization) {
    return t("lemonaidea_title_improve_edit_tips_a");
  } else if (TYPE.value === OptionsType.bodyText_optimization) {
    return t("lemonaidea_text_improve_edit_tips_a");
  }
});
watch(
  () => route.name,
  (val) => {
    console.log(val);
    switch (val) {
      case "title_paraphrasing":
        TYPE.value = OptionsType.title_paraphrasing;
        hasUnder.value = true;
        break;
      case "bodyText_paraphrasing":
        TYPE.value = OptionsType.bodyText_paraphrasing;
        hasUnder.value = true;
        break;
      case "title_optimization":
        TYPE.value = OptionsType.title_optimization;
        hasUnder.value = false;
        break;
      case "bodyText_optimization":
        TYPE.value = OptionsType.bodyText_optimization;
        hasUnder.value = false;
        break;
    }
    select.value = TYPE.value;
  },
  { immediate: true }
);
const langs = ["English", "ภาษาไทย", "日本語", "繁體中文", "Malay"];
const lang = computed(() => {
  return window.localStorage.getItem("lemon_web_lang");
});
const locals = computed(() => {
  // let localLan = window.localStorage.getItem("lemon_web_lang");
  if (locale.value === langs[0]) {
    return "en";
  } else if (locale.value === langs[1]) {
    return "th";
  } else if (locale.value === langs[2]) {
    return "ja";
  } else if (locale.value === langs[3]) {
    return "zh-hk";
  } else if (locale.value === langs[4]) {
    return "ma";
  }
});

const handleChange = (item: any) => {
  firstInput.value = "";
  secondInput.value = "";
  // if (locale.value === langs[0]) {
  //   locals.value = "en";
  // } else if (locale.value === langs[1]) {
  //   locals.value = "th";
  // } else if (locale.value === langs[2]) {
  //   locals.value = "ja";
  // } else if (locale.value === langs[3]) {
  //   locals.value = "zh-hk";
  // }
  switch (item) {
    case "lemonaidea_title_imitation":
      router.replace(`/${locals.value}/title_paraphrasing`);
      break;
    case "lemonaidea_text_imitation":
      router.push(`/${locals.value}/bodyText_paraphrasing`);
      break;
    case "lemonaidea_title_improve":
      router.push(`/${locals.value}/title_optimization`);
      break;
    case "lemonaidea_text_improve":
      router.push(`/${locals.value}/bodyText_optimization`);
      break;
  }
  resObj.value = [];
  oldResObj.value = [];
  // select.value = item;
};

const computedCss = computed(() => {
  switch (select.value) {
    case "lemonaidea_title_imitation":
      return "title_imi";
    case "lemonaidea_text_imitation":
      return "text_imi";
    case "lemonaidea_title_improve":
      return "title_imp";
    case "lemonaidea_text_improve":
      return "text_imp";
  }
});
const items = ref([
  "lemonaidea_title_imitation",
  "lemonaidea_text_imitation",
  "lemonaidea_title_improve",
  "lemonaidea_text_improve",
]);
const handleReSend = () => {
  judge();
  generate(objEle, locals.value)
    .then((res) => {
      if (res.errCode === 0) {
        if (
          TYPE.value === OptionsType.title_optimization ||
          TYPE.value === OptionsType.title_paraphrasing
        ) {
          oldResObj.value = [...res.payload.titles, ...resObj.value];
          // resObj.value = [...res.payload.titles, ...resObj.value];
          resObj.value = [
            ...res.payload.titles.map((element: any) => {
              return element.replace(/\n/g, "<br>");
            }),
            ...resObj.value,
          ];
        } else {
          oldResObj.value = res.payload.texts;
          resObj.value = res.payload.texts.map((element: any) => {
            return element.replace(/\n/g, "<br>");
          });
          // resObj.value = res.payload.texts;
        }
      } else if (res.errCode === 1003) {
        showUnloginToLogin.value = true;
        // emitter.emit("showUnLoginDialog");
      } else if (res.errCode === 1005) {
        emitter.emit("showLoginDialog");
        ElMessage({
          message: res.errMsg,
          type: "error",
        });
      } else {
        isLoading.value = false;

        ElMessage({
          message: res.errMsg,
          type: "error",
        });
      }
    })
    .finally(() => {
      // firstInput.value = "";
      // secondInput.value = "";
      isLoading.value = false;
      userStore.setProfile();
    })
    .catch((err) =>
      ElMessage({
        message: t("lemonaidea_toast_fail"),
        type: "success",
      })
    );
};
const handleChat = () => {
  window.localStorage.setItem("title", firstInput.value);
  window.localStorage.setItem("subject", secondInput.value);
  judge();
  isLoading.value = true;
  generate(objEle, locals.value)
    .then((res) => {
      if (res.errCode === 0) {
        if (
          TYPE.value === OptionsType.title_optimization ||
          TYPE.value === OptionsType.title_paraphrasing
        ) {
          // resObj.value = res.payload.titles;
          oldResObj.value = res.payload.titles;
          resObj.value = res.payload.titles.map((element: any) => {
            return element.replace(/\n/g, "<br>");
          });
        } else {
          // resObj.value = res.payload.texts;
          oldResObj.value = res.payload.texts;
          resObj.value = res.payload.texts.map((element: any) => {
            return element.replace(/\n/g, "<br>");
          });
        }
      } else if (res.errCode === 1003) {
        showUnloginToLogin.value = true;
      } else if (res.errCode === 1005) {
        emitter.emit("showLoginDialog");
        ElMessage({
          message: res.errMsg,
          type: "error",
        });
      } else {
        ElMessage({
          message: res.errMsg,
          type: "error",
        });
      }
    })
    .finally(() => {
      // firstInput.value = "";
      // secondInput.value = "";
      isLoading.value = false;
      userStore.setProfile();
    })
    .catch((err) =>
      ElMessage({
        message: t("lemonaidea_toast_fail"),
        type: "success",
      })
    );
};
</script>

<style lang="scss" scoped>
.content {
  margin-top: 90px;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  .confirm_copy {
    display: flex;
    width: 285px;
    height: 54px;
    padding: 10px 26px;
    justify-content: center;
    align-items: center;
    border-radius: 16px;
    background: #1d242f;
    color: #fff;
    font-family: Poppins;
    font-size: 18px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
  }
  .cancle {
    color: #909090;
    font-family: Poppins;
    font-size: 18px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    padding: 10px 26px;
    text-align: center;
    cursor: pointer;
  }
  .options-btn {
    background-color: #fff;
    width: 746px;
    min-height: 56px;
    flex-shrink: 0;
    border-radius: 28px;
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 4px 4px;
    & > :nth-child(2) {
      margin: 0 12px;
    }
    & > :nth-child(3) {
      margin-right: 12px;
    }
    .opsions {
      display: flex;
      padding: 14px 16px;
      justify-content: center;
      align-items: center;
      cursor: pointer;
    }
    .active {
      border-radius: 28px;
      translate: 0.4s;
    }
  }
  .main-box-min {
    height: 256px;
  }
  .main-box {
    height: 466px;
  }
  .basic-main-box {
    width: 742px;
    flex-shrink: 0;
    border-radius: 40px;
    background: #fff;
    box-shadow: 0px 2px 2px 0px rgba(0, 0, 0, 0.05);
    margin-top: 32px;
    padding: 24px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    img {
      width: 12px;
      height: 24px;
      flex-shrink: 0;
    }
    span {
      margin-left: 4px;
      color: #1d2331;
      font-family: Poppins;
      font-size: 18px;
      font-style: normal;
      font-weight: 700;
      line-height: 24px; /* 133.333% */
    }
    .top-box,
    .bottom-box {
      width: 100%;
      height: 100%;
    }
    .bottom-box {
      margin-top: 24px;
    }
    .title-box {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: flex-start;
    }

    .button-box {
      display: flex;
      width: 100%;
      justify-content: space-between;
      margin-top: 24px;
      .default {
        background: #e0e2da;
      }
      .active {
        border-radius: 16px;
        background: #1e232d;
        color: #fff;
      }
      button {
        display: flex;
        width: 200px;
        height: 48px;
        padding: 10px 26px;
        justify-content: center;
        align-items: center;
        gap: 10px;
        flex-shrink: 0;
        border-radius: 16px;
        color: #a8aaa3;
        font-family: Poppins;
        font-size: 18px;
        font-style: normal;
        font-weight: 500;
        line-height: normal;
        img {
          width: 16.711px;
          height: 17.934px;
          flex-shrink: 0;
        }
      }
    }
  }
  .title_imi {
    background: #cea64d;
    color: #2d2620;
  }
  .text_imi {
    color: #20262d;
    background: #d6e852;
  }
  .title_imp {
    background: #4b2572;
    color: #e2c3e7;
  }
  .text_imp {
    color: #d8e55b;
    background: #304e20;
  }
}
.el-textarea {
  color: #a8aaa3;
  font-family: Poppins;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 16px; /* 100% */
  margin-top: 16px;
  .el-textarea__inner {
    border-radius: 16px;
    background: #f6f7f5;
    &:focus {
      box-shadow: none;
      border: 2px solid #1d2331;
    }
  }
}
</style>
<style lang="scss">
.el-textarea__inner {
  &:focus {
    box-shadow: none;
    border: 2px solid #1d2331;
  }
}
</style>

<style lang="scss">
.content {
  .el-dialog {
    display: flex;
    width: 343px;
    padding: 32px 16px 16px 16px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 24px;
    background: #fff;
  }

  .el-dialog__header {
    padding: 0 !important;
    width: 100%;
    margin-bottom: 36px;
    display: inline-block;
  }

  .el-dialog__title {
    display: inline-block;
    width: 100%;
    color: #1d2331;
    text-align: center;
    font-family: Poppins;
    font-size: 24px;
    font-style: normal;
    font-weight: 700;
    line-height: 24px;
    /* 100% */
  }
}
.tab {
  .el-dialog {
    width: 590px;
    min-height: 240px;
    flex-shrink: 0;
    border-radius: 24px;
    background: #fff;
    box-shadow: 0px 2px 2px 0px rgba(0, 0, 0, 0.05);
    display: block;
    padding: 24px 0;
  }

  .el-dialog__title {
    color: #656565 !important;
    font-family: Poppins;
    font-size: 18px;
    font-style: normal;
    font-weight: 700;
    line-height: 24px; /* 133.333% */
  }
  .el-dialog__body {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
}
</style>
