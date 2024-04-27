<template>
  <div class="login_main">
    <img class="logo_login" src="@/assets/logo-login.png" alt="" />
    <div class="main_box">
      <p class="title">
        {{ $t("lemonaidea_login_title_web") }}
      </p>
      <p class="invited" v-if="isInvited">
        {{ $t("lemonaidea_invite_link_login_subtitle") }} {{ inviteUser.email }}
      </p>
      <p class="invited_btn" v-if="isInvited">
        {{ $t("lemonaidea_invite_link_login_subtitle_two") }}
      </p>
      <!-- <p class="title">{{ $t("lemonaidea_login_title_web") }}</p> -->
      <!-- <span class="title_span">{{ $t("lemonaidea_subtitle") }}</span> -->
      <div class="center_box">
        <el-input v-model="email" :placeholder="$t('lemonaidea_login_emailadress')" />
        <el-input
          class="code_input"
          v-model="code"
          :placeholder="$t('leomaidea_login_verify_code')"
        >
          <template #append>
            <el-button
              :class="['send_code', emailValid ? 'valid_email' : '', timer ? 'dark' : '']"
              @click="handleSendCode"
              >{{ resend ? $t("lemonaidea_btn_send") : timer + "s" }}</el-button
            >
          </template></el-input
        >
        <el-button @click="handleRegister" :class="[pass ? 'pass_code' : 'button']">{{
          $t("lemonaidea_login_btn_web")
        }}</el-button>
      </div>
      <!-- <span class="text"
        >By clicking Create account, you agree to lemonaidea Terms and Conditions and
        confirm you have read our Privacy Notice. You may receive offers, news and updates
        from us.</span
      > -->
      <p class="or">OR</p>
      <!----google登录 ---->
      <GoogleLogin :callback="callback" />
      <!-- <span class="account"
        >Already have an account?<span
          class="underline login"
          @click="router.push('/login')"
          >{{ $t("lemonaidea_login_btn_web") }}</span
        >
      </span> -->
      <div class="privacy">
        <span class="text">{{ $t("lemonaidea_login_policy") }}</span>
        <span class="underline login" @click="router.push('/privacy')">
          {{ $t("lemonaidea_privacy") }}
        </span>
        <span class="text">{{ $t("lemonaidea_login_policy_left") }}</span>
        <!-- <span class="text"> This site is protected by reCAPTCHA and the</span>
        <span class="underline">Google Privacy</span>
        <span class="text">Policy and</span>
        <span class="underline">Terms of Service apply</span>. -->
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { decodeCredential } from "vue3-google-login";
import { postSendCode, postRegister, postLogin } from "@/api";
import { useRouter } from "vue-router";
import md5 from "md5";
import { CLIENTID } from "@/utils/index";
import { useUserStore } from "@/store/modules/user";
import { ElMessage } from "element-plus";
import { useI18n } from "vue-i18n";

const { locale, t } = useI18n();
const userStore = useUserStore();
const email = ref("");
const code = ref("");
const timer = ref(0);
const resend = ref(false);
const isInvited = ref(false);
const router = useRouter();
const inviteUser = ref({} as any);
const invitedId = computed(() => {
  return router.currentRoute.value.params.inviteId ?? "";
});
const emailValid = computed(() => {
  var reg = /^[A-Za-z0-9]+([_\.][A-Za-z0-9]+)*@([A-Za-z0-9\-]+\.)+[A-Za-z]{2,6}$/;
  return reg.test(email.value);
});
const pass = computed(() => {
  return emailValid.value && code.value !== "";
});
const handleGetProfile = () => {
  postInviteUserProfile({ invite_code: invitedId.value }, userStore.getLang).then(
    (res) => {
      if (res.errCode === 0) {
        isInvited.value = true;
        inviteUser.value = res.payload.user;
      }
    }
  );
};
handleGetProfile();
const callback = (response: any) => {
  // decodeCredential will retrive the JWT payload from the credential
  const userData: any = decodeCredential(response.credential);
  if (userData) {
    googleLogin(
      {
        email: userData.email,
        name: userData.name,
        sub: userData.sub,
        sign: md5(userData.email + userData.sub + CLIENTID),
      },
      userStore.getLang
    )
      .then((res) => {
        console.log(res);
        if (res.errCode === 0) {
          router.push("/");
          // userStore.setInfo(res.payload);
          window.localStorage.setItem("user", JSON.stringify(res.payload));
          window.localStorage.setItem("user_token", res.payload.token.access);
          window.localStorage.setItem("unlogin_uuid", "");
        } else if (res.errCode === 2053) {
          userStore.setInfo(res.payload);
          window.localStorage.setItem("user", JSON.stringify(res.payload));
          window.localStorage.setItem("user_token", res.payload.token.access);
          window.localStorage.setItem("unlogin_uuid", "");
          router.push("/");
          ElMessage({
            message: res.errMsg ?? "",
            type: "warning",
          });
        }
      })
      .finally(() => {
        userStore.setProfile();
      });
  }
  console.log("Handle the userData", userData);
};
const { pause, resume } = useIntervalFn(() => {
  //// 每次定时任务 控制时间递减
  if (timer.value <= 0) {
    // 停止递减：停止定时器
    resend.value = true;
    pause();
  } else {
    timer.value -= 1;
  }
}, 1000);
const handleSendCode = () => {
  if (!email.value || timer.value) return;
  postSendCode({ email: email.value, verify_type: "03" }, userStore.getLang).then(
    (res) => {
      console.log(res);
      if (res) {
        resend.value = false;
      }
    }
  );
  //开启定时效果
  if (timer.value === 0) {
    timer.value = 60;
    // 重启定时器
    resume();
  } else {
    return;
  }
  ElMessage({
    message: t("lemonaidea_login_code_sent_toast"),
    type: "success",
  });
};
const handleRegister = () => {
  console.log(router.currentRoute.value.params.inviteId);
  let params = {
    // email: router.currentRoute.value.query.email,
    email: email.value,
    verify_code: code.value,
    invite_code: router.currentRoute.value.params?.inviteId ?? "",
  };
  if (
    router.currentRoute.value.fullPath.includes("login") ||
    router.currentRoute.value.query.isUser === "1"
  ) {
    postLogin(params, userStore.getLang)
      .then((res) => {
        if (res.errCode === 0) {
          userStore.setInfo(res.payload);
          window.localStorage.setItem("user", JSON.stringify(res.payload));
          window.localStorage.setItem("user_token", res.payload.token.access);
          window.localStorage.setItem("unlogin_uuid", "");
          router.push("/");
          userStore.setProfile();
        } else if (res.errCode === 2053) {
          userStore.setInfo(res.payload);
          window.localStorage.setItem("user", JSON.stringify(res.payload));
          window.localStorage.setItem("user_token", res.payload.token.access);
          router.push("/");
          ElMessage({
            message: res.errMsg ?? "",
            type: "warning",
          });
          userStore.setProfile();
        } else {
          ElMessage({
            message: res.errMsg,
            type: "warning",
          });
          // error.value = true;
        }
      })
      .then(() => {});
  } else {
    postRegister(params, userStore.getLang)
      .then((res) => {
        if (res.errCode === 0) {
          userStore.setInfo(res.payload);
          window.localStorage.setItem("user", JSON.stringify(res.payload));
          window.localStorage.setItem("user_token", res.payload.token.access);
          router.push("/");
          userStore.setProfile();
        } else if (res.errCode === 2053) {
          userStore.setInfo(res.payload);
          window.localStorage.setItem("user", JSON.stringify(res.payload));
          window.localStorage.setItem("user_token", res.payload.token.access);
          router.push("/");
          userStore.setProfile();

          ElMessage({
            message: res.errMsg ?? "",
            type: "warning",
          });
        } else {
          ElMessage({
            message: res.errMsg,
            type: "warning",
          });
          // error.value = true;
        }
      })
      .then(() => {});
  }
};
onDeactivated(() => {
  resume();
});
onMounted(() => {
  let body = document.getElementsByTagName("html")[0];
  // body.style.backgroundColor = "#fff";
  // console.log(body.style.backgroundColor)
});
</script>

<style lang="scss" scoped>
.login_main {
  height: 100%;
  background-color: #fff;
  .logo_login {
    width: 156px;
    height: 26px;
    flex-shrink: 0;
    margin: 48px 0 0 48px;
    display: inline-block;
  }
  .main_box {
    margin-top: 98px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .title {
      color: #1d2331;
      text-align: center;
      font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
        Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
      font-size: 48px;
      font-style: normal;
      font-weight: 900;
      line-height: 48px; /* 100% */
      padding: 0 100px 34px 100px;
    }
    .invited_btn {
      margin-bottom: 30px;
    }
    .invite_title {
      color: #1d2331;
      text-align: center;
      font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
        Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
      font-size: 48px;
      font-style: normal;
      font-weight: 900;
      line-height: 48px; /* 100% */
      padding: 72px 100px 24px 100px;
    }
    .send_code {
      width: 142px;
      height: 48px;
      flex-shrink: 0;
      border-radius: 8px;
      background: #e0e2da;
      color: #a8aaa3;
      font-family: Poppins;
      font-size: 16px;
      font-style: normal;
      font-weight: 400;
      line-height: 24px; /* 150% */
    }
    .title {
      color: #1d2331;
      font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
        Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
      font-size: 48px;
      font-style: normal;
      font-weight: 900;
      line-height: 74px; /* 154.167% */
    }
    .title_span {
      margin-top: 8px;
      margin-bottom: 48px;
    }
    .center_box:deep(.el-input-group__append) {
      box-shadow: 0 0 0 0;
      border: 0;
    }
    .center_box :deep(.el-input__wrapper) {
      box-shadow: 0 0 0 0;
    }
    .center_box {
      width: 588px;

      .el-input {
        width: 588px;
        height: 48px;
        flex-shrink: 0;
      }
      .button {
        width: 588px;
        height: 48px;
        flex-shrink: 0;
        border-radius: 48px;
        background: #e0e2da;
        color: #a8aaa3;
        font-family: Poppins;
        font-size: 16px;
        font-style: normal;
        font-weight: 500;
        line-height: normal;
        margin-top: 16px;
        margin-bottom: 24px;
        border: none;
      }
      .code_input {
        margin-top: 8px;
      }
    }
    .privacy {
      position: absolute;
      bottom: 0;
    }
    .valid_email {
      width: 142px;
      height: 48px;
      flex-shrink: 0;
      border-radius: 8px;
      background: #7730d0;
      color: #fff;
      font-family: Poppins;
      font-size: 16px;
      font-style: normal;
      font-weight: 400;
      line-height: 24px; /* 150% */
    }
    .dark {
      width: 142px;
      height: 48px;
      flex-shrink: 0;
      border-radius: 8px;
      background: #e0e2da;
      color: #a8aaa3;
      text-align: center;
      font-family: Poppins;
      font-size: 16px;
      font-style: normal;
      font-weight: 400;
      line-height: 24px; /* 150% */
    }
    .pass_code {
      width: 588px;
      height: 48px;
      flex-shrink: 0;
      border-radius: 48px;
      background: #1d242f;
      color: #fff;
      font-family: Poppins;
      font-size: 16px;
      font-style: normal;
      font-weight: 500;
      line-height: normal;
      margin-top: 16px;
      margin-bottom: 24px;
      border: none;
    }
    .text {
      color: #656565;
      font-family: Poppins;
      font-size: 12px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
      width: 587px;
    }
    .or {
      color: #1d2331;
      text-align: center;
      font-family: Poppins;
      font-size: 16px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
      margin: 12px 0;
    }
    .account {
      color: #656565;
      text-align: center;
      font-family: Poppins;
      font-size: 14px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
      letter-spacing: -0.7px;
      margin: 48px 0 104px 0;
    }
    .underline {
      color: #7730d0;
      font-family: Poppins;
      font-size: 14px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
      letter-spacing: -0.7px;
      text-decoration-line: underline;
    }
    .login {
      font-size: 14px;
      cursor: pointer;
    }
  }
}
</style>
<style lang="scss">
.el-input__wrapper {
  border-radius: 8px;
  background: #f6f7f5;
}
.el-input__inner {
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 20px; /* 142.857% */
  color: #1d2331;
  font-family: Poppins;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 14px; /* 100% */
}
</style>
