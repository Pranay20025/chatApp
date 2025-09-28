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

import userReducer from "./userSlice";
import socketReducer from "./socketsice";
import usersReducer from "./usersSlice";
import messageReducer from "./messageSlice";

import { combineReducers } from "redux";

const rootReducer = combineReducers({
  user: userReducer,
  users: usersReducer,
  messages: messageReducer,
  socket: socketReducer,
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["user", "messages"], // Only persist specific slices if needed
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
