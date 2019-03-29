import Vue from "vue";
import Vuex from "vuex";
import { prettify } from "./prettier";

Vue.use(Vuex);

const defaultPrettierOptions = {
  // Global
  printWidth: 80,
  tabWidth: 4,
  useTabs: false,
  // Common
  singleQuote: false,
  noBracketSpacing: false
};

export default new Vuex.Store({
  state: {
    showOptions: true,
    prettierOptions: { ...defaultPrettierOptions },
    inputCode: "",
    outputCode: ""
  },
  mutations: {
    toggleOptionsVisibility(state) {
      state.showOptions = !state.showOptions;
    },
    updateInputCode(state, inputCode) {
      state.inputCode = inputCode;
    },
    prettify(state) {
      state.outputCode = prettify(state.inputCode, state.prettierOptions);
    },
    updatePrettierOption(state, { name, value }) {
      state.prettierOptions[name] = value;
    },
    resetPrettierOptions(state) {
      state.prettierOptions = { ...defaultPrettierOptions };
    }
  },
  actions: {
    toggleOptionsVisibility({ commit }) {
      commit("toggleOptionsVisibility");
    },
    updateCode({ commit }, inputCode) {
      commit("updateInputCode", inputCode);
      commit("prettify");
    },
    updatePrettierOption({ commit }, { name, value }) {
      commit("updatePrettierOption", { name, value });
      commit("prettify");
    },
    resetPrettierOptions({ commit }) {
      commit("resetPrettierOptions");
      commit("prettify");
    }
  }
});
