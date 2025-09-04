// Import React and ReactDOM
import React from "react";
import { createRoot } from "react-dom/client";

import "swiper/css";
import "swiper/css/pagination";
import "zmp-ui/zaui.css";
import "./css/tailwind.css";
import "./css/app.scss";

// Import App Component
import App from "./components/app";
import appConfig from "../app-config.json";

if (!window.APP_CONFIG) {
  window.APP_CONFIG = appConfig;
}

// Set default config if none exists
const defaultConfig = {
  app: {
    title: "Demo App",
    textColor: "#000000",
    leftButton: "back",
    statusBar: "dark",
    selfControlLoading: true,
    hideAndroidBottomNavigationBar: false,
    hideIOSSafeAreaBottom: false,
    actionBarHidden: false,
  },
  listCSS: [],
  listSyncJS: [],
  listAsyncJS: [],
  template: {
    name: "default",
  },
  pages: [],
};

window.APP_CONFIG = { ...defaultConfig, ...window.APP_CONFIG };

// Mount React App
const root = createRoot(document.getElementById("app")!);
root.render(React.createElement(App));
