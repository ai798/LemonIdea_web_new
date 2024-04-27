import { getUserProfile } from '@/api';
// import { useCookies } from '@vueuse/integrations/useCookies';
import { defineStore } from 'pinia';

const { VITE_TOKEN_KEY } = import.meta.env;
// const token = useCookies().get(VITE_TOKEN_KEY as string);

interface StoreUser {
  // token: string;
  info: Object;
  profile: Object;
  model: String;
  hasToken: boolean;
  lang: String;
}

export const useUserStore = defineStore({
  id: 'app-user',
  state: (): StoreUser => ({
    // token: token,
    info: {} as any,
    profile: {},
    model: '3.5',
    hasToken: false,
    lang: 'en'
  }),
  getters: {
    getUserInfo(): any {
      return this.info || {};
    },
    getProfile(): any {
      return this.profile || {};
    },
    getModel(): any {
      return this.model;
    },
    getToken(): any {
      return this.hasToken;
    },
    getLang(): any {
      return this.lang;
    },
  },
  actions: {
    setInfo(info: any) {
      this.info = info ? info : '';
      window.localStorage.removeItem('unlogin_uuid');
    },
    setModel(model: any) {
      this.model = model;
    },
    reset(): any {
      this.info = {};
      this.profile = {};
      this.hasToken = false;
      window.localStorage.removeItem('unlogin_uuid');
    },
    setProfile() {
      return new Promise((resolve) => {
        getUserProfile(this.lang).then((res) => {
          if (res.errCode === 0) {
            this.reset();
            if (res.payload.user.username) {
              this.hasToken = true;
            }
            this.profile = res.payload;
            window.localStorage.setItem('user_profile', JSON.stringify(res.payload));
          }
          resolve(res);
        });
      });
    },
    setLang(lang: string) {
      this.lang = lang
    },
    login() {
      // return new Promise((resolve) => {
      //   loginPassword().then((res) => {
      //     this.setInfo(res);
      //     resolve(res);
      //   });
      // });
    },
  },
  persist: true,
});
