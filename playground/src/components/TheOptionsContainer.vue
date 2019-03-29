<template>
  <aside v-show="$store.state.showOptions" class="options-container">
    <Options label="Global">
      <OptionItem name="printWidth" label="--print-width" type="number"/>
      <OptionItem name="tabWidth" label="--tab-width" type="number"/>
      <OptionItem name="useTabs" label="--use-tabs" type="checkbox"/>
    </Options>

    <Options label="Common">
      <OptionItem name="singleQuote" label="--single-quote" type="checkbox"/>
      <OptionItem name="noBracketSpacing" label="--no-bracket-spacing" type="checkbox"/>
    </Options>

    <div class="p-2">
      <b-btn variant="outline-secondary" size="sm" @click="$store.dispatch('resetPrettierOptions')">
        Reset options
      </b-btn>
    </div>
  </aside>
</template>

<script>
import OptionItem from "./OptionItem";
import Options from "./Options";

export default {
  name: "TheOptionsContainer",
  components: { Options, OptionItem }
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
