import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { load, save } from 'redux-localstorage-simple'
import userReducer from './auth/userSlice'



const rootReducer = combineReducers({user:userReducer});

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) => 
            getDefaultMiddleware({ thunk: true }).concat(save({states:['user'], namespace: 'user_info'})),
        preloadedState: load({states:['user'], namespace: 'user_info'})
    })
};

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']