<template>
  <footer class="bottom-bar">
    <b-btn variant="outline-secondary" size="sm" @click="$store.dispatch('toggleOptionsVisibility')" class="mr-2">
      {{ $store.state.showOptions ? "Hide options" : "Show options" }}
    </b-btn>

    <b-btn variant="outline-secondary" size="sm" @click="$store.dispatch('updateCode', '')">
      Clear
    </b-btn>
  </footer>
</template>

<script>
export default {
  name: "TheBottomBar"
};
</script>

<style scoped>
.bottom-bar {
  border-top: 1px solid #ddd;
  padding: 5px;
}
</style>
