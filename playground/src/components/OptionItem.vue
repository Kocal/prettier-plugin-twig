<template>
  <div>
    <b-form-checkbox v-if="theType === 'checkbox'" :checked="value" :title="description" @input="update">
      {{ cliName }}
    </b-form-checkbox>
    <b-form-group v-else>
      <label :for="`input-${name}`" :title="description">
        {{ cliName }}
      </label>
      <b-form-input
        :id="`input-${name}`"
        :type="theType"
        :value="value"
        :number="theType === 'number'"
        :min="$attrs.range && $attrs.range.start"
        :max="$attrs.range && $attrs.range.end"
        :step="$attrs.range && $attrs.range.step"
        @input="update"
        size="sm"
      />
    </b-form-group>
  </div>
</template>

<script>
export default {
  name: "OptionItem",
  props: {
    name: {
      type: String,
      required: true
    },
    cliName: {
      type: String,
      required: true
    },
    type: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    }
  },
  computed: {
    theType() {
      if (this.type === "boolean") {
        return "checkbox";
      }

      if (this.type === "int") {
        return "number";
      }

      return this.type;
    },
    value() {
      return this.$store.state.optionsValues[this.name];
    }
  },
  methods: {
    update(e) {
      let value = this.theType === "checkbox" ? (!!e || !!e.checked) : e;

      // normally we don't have to do this because of `number` props
      // but for some reason it's not working (only available
      if (/^\d+$/.test(value)) {
        value = parseInt(value, 10);
      }

      this.$store.dispatch("updatePrettierOption", { name: this.name, value });
    }
  }
};
</script>

<style scoped>
label {
  font-family: Consolas, Courier New, Courier, monospace;
  margin: 10px 0;
}
</style>
