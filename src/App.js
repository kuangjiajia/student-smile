import React from "react";
import { Provider } from "react-redux";
import { HashRouter } from "react-router-dom";
import Root from "./router/index.js";
import { store } from "./store/index.js";

const App = () => (
  <Provider store={store}>
    <HashRouter>
      <Root />
    </HashRouter>
  </Provider>
);

export default App;
