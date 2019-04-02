<template>
  <footer class="bottom-bar">
    <b-btn variant="outline-secondary" size="sm" @click="$store.dispatch('toggleOptionsVisibility')" class="mr-2">
      {{ $store.state.showOptions ? "Hide options" : "Show options" }}
    </b-btn>

    <b-btn variant="outline-secondary" size="sm" @click="$store.dispatch('updateCode', '')">
      Clear
    </b-btn>

    <Spacer/>

    <ClipboardButton text="Copy link" :copy="() => getUrl()"/>
    <ClipboardButton text="Copy markdown" class="ml-2" :copy="() => generateMarkdown()"/>
    <b-btn ref="btn" variant="outline-secondary" size="sm" class="ml-2" target="_blank" rel="noopener" :href="generateIssueUrl()">
      Report issue
    </b-btn>
  </footer>
</template>

<script>
import Spacer from "./Spacer";
import ButtonCopyLink from "./ClipboardButton";
import ClipboardButton from "./ClipboardButton";
import { formatMarkdown } from "../markdown";
import { buildCliArgs } from "../cli";

export default {
  name: "TheBottomBar",
  components: { ClipboardButton, ButtonCopyLink, Spacer },
  methods: {
    getUrl() {
      return window.location.href;
    },
    generateMarkdown() {
      return formatMarkdown(
        this.$store.state.inputCode,
        this.$store.state.outputCode,
        this.$store.getters.version,
        buildCliArgs(this.$store.getters.options, this.$store.state.optionsValues),
        this.getUrl()
      );
    },
    generateIssueUrl() {
      return `https://github.com/Kocal/prettier-plugin-twig/issues/new?body=${encodeURIComponent(this.generateMarkdown())}`;
    }
  }
};
</script>

<style scoped>
.bottom-bar {
  display: flex;
  border-top: 1px solid #ddd;
  padding: 5px;
}
</style>
