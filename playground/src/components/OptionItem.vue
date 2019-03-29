<template>
  <div>
    <b-form-checkbox v-if="type === 'checkbox'" :checked="value" @input="update">
      {{ label }}
    </b-form-checkbox>
    <b-form-group v-else>
      <label :for="`input-${name}`">
        {{ label }}
      </label>
      <b-form-input :id="`input-${name}`" :type="type" :value="value" :number="type === 'number'" @input="update" size="sm"/>
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
    label: {
      type: String,
      required: true
    },
    type: {
      type: String,
      required: true
    }
  },
  computed: {
    value() {
      return this.$store.state.prettierOptions[this.name];
    }
  },
  methods: {
    update(e) {
      let value = this.type === "checkbox" ? (!!e || !!e.checked) : e;

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
