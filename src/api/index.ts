import { http } from '@/utils/request';
// import { useUserStore } from "@/store/modules/user";
// const userStore = useUserStore();
/**
 * 账号密码登录
 * @returns UseAxiosReturn
 */
export function loginPassword(lang: any) {
  return http.post(`/api/login`, {
    data: { name: '123' },
    headers: {
      'Accept-Language': lang,
    },
  });
}

/**
 * 生成内容
 * @returns UseAxiosReturn
 */
export function generate(data: any, lang: any) {
  return http.post(`/api/chat/generate`, data, {
    headers: {
      'Accept-Language': lang,
    },
  });
}
/**
 * 发送反馈
 * @returns UseAxiosReturn
 */
export function sendFB(data: any, lang: any) {
  return http.post(`/api/user/feedback`, data, {
    headers: {
      'Accept-Language': lang,
    },
  });
}

/**
 * 发送验证码
 * @returns UseAxiosReturn
 */
export function postSendCode(data: any, lang: any) {
  return http.post(`/api/user/verifycode`, data, {
    headers: {
      'Accept-Language': lang,
    },
  });
}

/**
 * 注册
 * @returns UseAxiosReturn
 */
export function postRegister(data: any, lang: any) {
  return http.post(`/api/user/register`, data, {
    headers: {
      'Accept-Language': lang,
    },
  });
}

/**
 * 检查是否注册
 * @returns UseAxiosReturn
 */
export function checkRegister(data: any, lang: any) {
  return http.post(`/api/user/checkregister`, data, {
    headers: {
      'Accept-Language': lang,
    },
  });
}
/**
 * 登录
 * @returns UseAxiosReturn
 */
export function postLogin(data: any, lang: any) {
  return http.post(`/api/user/login`, data,
    {
      headers: {
        'Accept-Language': lang,
      }
    }
  );
}
/**
 * 获取用户资料
 * @returns UseAxiosReturn
 */
export function getUserProfile(lang: any) {
  return http.get(`/api/user/profile`, {
    headers: {
      'Accept-Language': lang,
    },
  });
}
/**
 * 获取邀请用户的资料
 * @returns UseAxiosReturn
 */
export function postInviteUserProfile(data: any, lang: any) {
  return http.post(`/api/user/invitecodeinfo`, data, {
    headers: {
      'Accept-Language': lang,
    },
  });
}
/**
 * Google登陆
 * @returns UseAxiosReturn
 */
export function googleLogin(data: any, lang: any) {
  return http.post(`/api/user/logingoogle`, data, {
    headers: {
      'Accept-Language': lang,
    },
  });
}
/**
 * 隐私政策
 * @returns UseAxiosReturn
 */
export function getUserPrivacy(lang: any) {
  return http.get(`/api/user/privacy`, {
    headers: {
      'Accept-Language': lang,
    },
  });
}