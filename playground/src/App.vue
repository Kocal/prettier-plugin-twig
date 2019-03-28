<template>
  <div>
    <TheHeader/>
    <b-container fluid>
      <b-row>
        <b-col sm="6">
          <codemirror v-model="inputCode" :options="cmInputOptions"/>
        </b-col>
        <b-col sm="6">
          <codemirror v-model="outputCode" :options="cmOutputOptions"/>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import { debounce } from "lodash-es";
import TheHeader from "./components/TheHeader";

export default {
  name: "App",
  components: { TheHeader },
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

