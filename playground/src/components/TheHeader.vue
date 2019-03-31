<template>
  <b-navbar variant="dark" type="dark" class="header">
    <b-navbar-brand>
      <span>Prettier <span class="version">({{ $store.state.meta.version || "..." }})</span> + Twig</span>
    </b-navbar-brand>
  </b-navbar>
</template>

<script>
export default {
  name: "TheHeader"
};
</script>

<style scoped>
.version {
  color: #999;
  font-size: .8rem;
}
</style>
