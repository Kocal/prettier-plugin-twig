<template>
  <span>
    <b-btn ref="btn" variant="outline-secondary" size="sm">
      {{ text }}
    </b-btn>
    <b-tooltip v-if="showTooltip" :target="() => $refs['btn']" :title="tooltipText" :triggers="[]" show/>
  </span>
</template>

<script>
import ClipboardJS from "clipboard";

export default {
  name: "ClipboardButton",
  props: {
    text: {
      type: String,
      required: true
    },
    copy: {
      type: [String, Function],
      required: true
    }
  },
  data() {
    return {
      showTooltip: false,
      tooltipText: ""
    };
  },
  mounted() {
    this.clipboard = new ClipboardJS(this.$refs.btn, {
      text: () => {
        return typeof this.copy === "function" ? this.copy() : this.copy;
      }
    });
    this.clipboard.on("success", () => this.tooltip("Copied!"));
    this.clipboard.on("error", () => this.tooltip("Press ctrl+c to copy"));
  },
  methods: {
    tooltip(text) {
      this.tooltipText = text;
      this.showTooltip = true;

      if (this.timer) {
        clearTimeout(this.timer);
      }

      this.timer = setTimeout(() => {
        this.timer = null;
        this.showTooltip = false;
      }, 2000);
    }
  }
};
</script>
