import {combineReducers, configureStore} from "@reduxjs/toolkit"
import userSlice from "./user/userSlice"
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';




const rootReducer =combineReducers({ user:userSlice})

const persistconfig ={
    key :'root',
    storage,
    version:1,

}

const persistdata = persistReducer(persistconfig,rootReducer)

export const store =configureStore({
    reducer:persistdata,
   middleware:(getDefaultMiddleware)=>getDefaultMiddleware({
    serializableCheck:false,
   }),
})
export const persistor =persistStore(store)