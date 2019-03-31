import Vue from "vue";
import Vuex from "vuex";
import paramCase from "param-case";
import { getMetadata, prettify } from "./worker";

Vue.use(Vuex);

const getOptions = state => state.meta && state.meta.supportInfo && state.meta.supportInfo.options || [];

export default new Vuex.Store({
  state: {
    metaLoading: true,
    metaError: false,
    meta: {},
    showOptions: true,
    optionsValues: {},
    inputCode: "",
    outputCode: ""
  },
  getters: {
    options: (state) => getOptions(state),
    optionsByCategory: (state) => (category) => getOptions(state).filter(option => option.category === category)
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
    loadMeta(state, value) {
      state.metaLoading = value;
    },
    metaError(state, err) {
      state.metaError = err;
    },
    updateMeta(state, { supportInfo, version }) {
      state.meta = { supportInfo, version };
      state.meta.supportInfo.options = state.meta.supportInfo.options.map(option => {
        if (option.type === "boolean" && option.default === true) {
          option.inverted = true;
        }

        option.cliName = `--${(option.inverted ? "no-" : "")}${paramCase(option.name)}`;

        return option;
      });
    },
    updatePrettierOption(state, { name, value }) {
      state.optionsValues[name] = value;
    },
    resetPrettierOptions(state) {
      getOptions(state).forEach((option) => {
        Vue.set(state.optionsValues, option.name, option.default);
      });
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
      prettify(state.inputCode, state.optionsValues)
        .then(result => commit("updateOutputCode", result.formatted))
        .catch(e => commit("updateOutputCode", e));
    },
    loadPrettierMeta({ commit }) {
      commit("loadMeta", true);
      commit("metaError", null);

      getMetadata()
        .then(({ supportInfo, version }) => {
          commit("updateMeta", { supportInfo, version });
          commit("resetPrettierOptions");
          commit("loadMeta", false);
        })
        .catch(e => {
          commit("loadMeta", false);
          commit("metaError", e);
          console.error(e);
        });
    }
  }
});
