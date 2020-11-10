import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./rootReducer";
import devToolsEnhancer from "remote-redux-devtools";
const store = configureStore({
  reducer: rootReducer,
  devTools: false,
  enhancers: [devToolsEnhancer({ realtime: true })],
});
// if (process.env.NODE_ENV === "development" && module.hot) {
//   module.hot.accept("./rootReducer", () => {
//     const newRootReducer = require("./rootReducer").default;
//     store.replaceReducer(newRootReducer);
//   });
// }

export default store;
