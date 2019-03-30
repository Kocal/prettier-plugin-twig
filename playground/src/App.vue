<template>
  <div id="app">
    <TheHeader/>
    <div class="editors-container">
      <TheOptionsContainer/>
      <div class="editors">
        <codemirror :value="$store.state.inputCode" :options="cmInputOptions" @input="onInputCodeChange" class="editor"/>
        <codemirror :value="$store.state.outputCode" :options="cmOutputOptions" class="editor"/>
      </div>
    </div>
    <TheBottomBar/>
  </div>
</template>

<script>
import { debounce } from "lodash-es";
import TheHeader from "./components/TheHeader";
import TheOptionsContainer from "./components/TheOptionsContainer";
import TheBottomBar from "./components/TheBottomBar";

export default {
  name: "App",
  components: { TheBottomBar, TheOptionsContainer, TheHeader },
  computed: {
    cmInputOptions() {
      return {
        lineNumbers: true,
        mode: "htmltwig",
        rulers: [{ color: "lightgrey", column: this.$store.state.prettierOptions.printWidth }]
      };
    },
    cmOutputOptions() {
      return {
        lineNumbers: true,
        mode: "htmltwig",
        readOnly: true,
        rulers: [{ color: "black", column: this.$store.state.prettierOptions.printWidth }]
      };
    }
  },
  beforeMount() {
    this.onInputCodeChange(`{%set world = 'world'%}
Hello {{world}}!`);
  },
  methods: {
    onInputCodeChange: debounce(function(inputCode) {
      this.$store.dispatch("updateCode", inputCode);
    }, 100)
  }
};
</script>

<style>
#app {
  height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: #fafafa;
}

.editors-container {
  flex: 1;
  display: flex;
}

.options-container {
  flex: 0 0 200px;
}

.editors {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.editor {
  flex: 1;
  position: relative;
  border-color: #ddd;
  border-width: 1px 0 0 1px;
  border-style: solid;
}

.CodeMirror {
  height: auto;
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
}

@media (min-width: 800px) {
  .editors {
    flex-direction: row;
  }

  .editor {
    border-top: 0
  }
}
</style>
