export const useMainStore = defineStore("MainStore", {
  state: () => {
    return {
      layout: "default",
      isLogged: false,
    };
  },
  actions: {},
  getters: {
    getLayout: (state) => {
      return state.layout;
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useMainStore, import.meta.hot));
}
