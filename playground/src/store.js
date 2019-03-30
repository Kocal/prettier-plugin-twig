import Vue from "vue";
import Vuex from "vuex";
import { prettify } from "./worker";

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
    updateOutputCode(state, outputCode) {
      state.outputCode = outputCode;
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
    updateCode({ commit, dispatch }, inputCode) {
      commit("updateInputCode", inputCode);
      dispatch("prettify");
    },
    updatePrettierOption({ commit, dispatch }, { name, value }) {
      commit("updatePrettierOption", { name, value });
      dispatch("prettify");
    },
    resetPrettierOptions({ commit, dispatch }) {
      commit("resetPrettierOptions");
      dispatch("prettify");
    },
    prettify({ state, commit }) {
      prettify(state.inputCode, state.prettierOptions)
        .then(result => commit("updateOutputCode", result.formatted))
        .catch(e => commit("updateOutputCode", e));
    }
  }
});
