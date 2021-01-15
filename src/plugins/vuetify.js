import Vue from "vue";
import Vuetify from "vuetify/lib/framework";

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: "#045762",
        secondary: "#4e8d7c",
        tertiary: "#f3f2da"
      }
    }
  }
});
