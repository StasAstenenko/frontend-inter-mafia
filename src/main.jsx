import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "./redux/store.js";
import "./locales/i18n.js";
import { LanguageProvider } from "./locales/langContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <LanguageProvider>
            <App />
          </LanguageProvider>
        </PersistGate>
      </Provider>
    </BrowserRouter>
  </StrictMode>
);
