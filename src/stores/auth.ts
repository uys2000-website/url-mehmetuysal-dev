import { User } from "firebase/auth";
export const useAuthStore = defineStore("AuthStore", {
  state: () => {
    return {
      user: {} as User,
    };
  },
  actions: {
    setUser(user: User) {
      this.user = user;
    },
  },
  getters: {
    getLayout: (state) => {
      return "state.layout";
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAuthStore, import.meta.hot));
}
