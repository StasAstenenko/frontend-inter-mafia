import { configureStore } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { authReducer } from "./auth/slice";
import { settingsReducer } from "./settings/slice";
import { waterReducer } from "./water/slice";

const authConfig = {
  key: "auth",
  storage,
  whitelist: ["token"],
};

const settingsConfig = {
  key: "settings",
  storage,
  whitelist: ["settings"],
};

const persistConfig = {
  key: "water",
  storage,
  whitelist: ["water"],
};

export const store = configureStore({
  reducer: {
    water: persistReducer(persistConfig, waterReducer),
    settings: persistReducer(settingsConfig, settingsReducer),
    auth: persistReducer(authConfig, authReducer),
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
