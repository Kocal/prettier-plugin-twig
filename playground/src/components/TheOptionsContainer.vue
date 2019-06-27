<template>
  <aside v-show="$store.state.showOptions" class="options-container">
    <template v-if="$store.state.metaLoading">
      Loading...
    </template>
    <template v-else-if="$store.state.metaError">
      {{ $store.state.metaError }}
    </template>
    <template v-else>
      <Options
        v-for="category in categoriesToDisplay"
        :key="category"
        :label="category"
      >
        <OptionItem
          v-for="option in $store.getters.optionsByCategory(category)"
          v-if="optionsToDisplay.includes(option.name)"
          v-bind="option"
          :key="option.name"
        />
      </Options>

      <div class="p-2">
        <b-btn variant="outline-secondary" size="sm" @click="$store.dispatch('resetPrettierOptions')">
          Reset options
        </b-btn>
      </div>
    </template>
  </aside>
</template>

<script>
import OptionItem from "./OptionItem";
import Options from "./Options";

export default {
  name: "TheOptionsContainer",
  components: { Options, OptionItem },
  data() {
    return {
      categoriesToDisplay: ["Global", "Common"],
      optionsToDisplay: [
        // Global
        "printWidth", "tabWidth", "useTabs",
        // Common
        "bracketSpacing", "singleQuote"
      ]
    };
  }
};
</script>

<style scoped>
>>> label {
  font-family: Consolas, Courier New, Courier, monospace;
  font-size: 12px;
  line-height: 2;
}

>>> .form-group {
  margin-bottom: 0;
}

>>> input[type=number] {
  max-width: 60px;
  display: inline-block;
  margin-left: .5rem;
}
</style>
