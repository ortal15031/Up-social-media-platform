import {configureStore} from '@reduxjs/toolkit';
import authSlice from '../slices/AuthSlice';
import PostSlice from '../slices/PostSlice';
import UserSlice from '../slices/UserSlice'
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import thunk from 'redux-thunk';
import {combineReducers} from '@reduxjs/toolkit'; 
// import {FLUSH,REHYDRATE,PAUSE,PERSIST,PURGE,REGISTER} from 'redux-persist'
const persistConfig = {
  key: 'root',
  version:1,
  storage,
  whitelist:['auth']
}

const rootReducer = combineReducers({ 
    auth: authSlice.reducer,
    user: UserSlice.reducer,
    post:PostSlice.reducer
  })


  const persistedReducer = persistReducer(persistConfig, rootReducer);


export const store=configureStore({
    reducer:{
     reducer:persistedReducer},
    devTools: true,
    middleware: [thunk]
});

export const persistor = persistStore(store)



