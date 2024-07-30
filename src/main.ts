import { createApp } from "vue";
import App from "./App.vue";
import store from "./store";
import "@/assets/styles/styles.scss";

import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faHorse } from "@fortawesome/free-solid-svg-icons";

library.add(faHorse);

const app = createApp(App);
app.component("font-awesome-icon", FontAwesomeIcon);
app.use(store).mount("#app");
