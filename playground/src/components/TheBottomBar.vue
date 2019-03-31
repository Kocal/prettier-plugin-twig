<template>
  <footer class="bottom-bar">
    <b-btn variant="outline-secondary" size="sm" @click="$store.dispatch('toggleOptionsVisibility')" class="mr-2">
      {{ $store.state.showOptions ? "Hide options" : "Show options" }}
    </b-btn>

    <b-btn variant="outline-secondary" size="sm" @click="$store.dispatch('updateCode', '')">
      Clear
    </b-btn>

    <Spacer/>
  </footer>
</template>

<script>
import Spacer from "./Spacer";
export default {
  name: "TheBottomBar",
  components: { Spacer }
};
</script>

<style scoped>
.bottom-bar {
  display: flex;
  border-top: 1px solid #ddd;
  padding: 5px;
}
</style>
