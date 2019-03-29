<template>
  <div id="app">
    <TheHeader class="header"/>
    <div class="editors-container">
      <TheOptionsContainer class="options-container"/>
      <div class="editors">
        <codemirror v-model="inputCode" :options="cmInputOptions" class="editor"/>
        <codemirror v-model="outputCode" :options="cmOutputOptions" class="editor"/>
      </div>
    </div>
    <TheBottomBar class="bottom-bar"/>
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
  data() {
    return {
      inputCode: `{%set world = 'world'%}
Hello {{world}}!`,
      outputCode: null,
      prettierOptions: {
        printWidth: 80
      }
    };
  },
  computed: {
    cmInputOptions() {
      return {
        lineNumbers: true,
        mode: "twig",
        rulers: [{ color: "lightgrey", column: this.prettierOptions.printWidth }]
      };
    },
    cmOutputOptions() {
      return {
        lineNumbers: true,
        mode: "twig",
        readOnly: true,
        rulers: [{ color: "black", column: this.prettierOptions.printWidth }]
      };
    }
  },
  watch: {
    inputCode: {
      immediate: true,
      handler: debounce(function(inputCode) {
        if (!inputCode) {
          this.outputCode = "";
          return;
        }

        try {
          this.outputCode = global.prettier.format(inputCode, {
            plugins: global.prettierPlugins,
            parser: "twig"
          });
        } catch (e) {
          this.outputCode = typeof e === "string" ? e : e.message;
        }
      }, 100)
    }
  }
};
</script>

<style>
#app {
  height: 100vh;
  display: flex;
  flex-direction: column;
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
