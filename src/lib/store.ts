import { configureStore, combineReducers } from '@reduxjs/toolkit';
import counterReducer from './features/counter/counterSlice';
import authReducer from './features/auth/authSlice';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
    key: 'root',
    storage,
    blacklist: ['somethingTemporary'], // Add any reducers that you want to exclude from persistence
};
const rootReducer = combineReducers({
    auth: authReducer,
    counter: counterReducer,
    // Add other reducers here if needed
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const makeStore = () =>
    configureStore({
        reducer: {
            counter: persistedReducer,
            auth: persistedReducer,
            // Add other reducers here if needed
        },
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware({
                serializableCheck: false
            }),
    });


// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the RootState and AppDispatch types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']

export const store = makeStore();
export const persistor = persistStore(store);
