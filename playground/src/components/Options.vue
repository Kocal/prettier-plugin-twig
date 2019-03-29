<template>
  <div class="options">
    <div class="label">
      {{ label }}
    </div>
    <slot/>
  </div>
</template>

<script>
export default {
  name: "Options",
  props: {
    label: {
      type: String,
      required: true
    }
  }
};
</script>

<style scoped>
.options {
  padding: 10px;
}

.options {
  border-bottom: 1px solid lightgrey;
}

.label {
  margin: 0 0 .5rem;
}
</style>
