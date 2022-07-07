import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { load, save } from 'redux-localstorage-simple'
import userReducer from './auth/userSlice'



const rootReducer = combineReducers({user:userReducer});

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) => 
            getDefaultMiddleware({ thunk: true }).concat(save({states:['user']})),
        preloadedState: load({states:['user']})
    })
};

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']