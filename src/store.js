import { configureStore } from "@reduxjs/toolkit";
import postsReducer from './features/postSlice';

const store = configureStore({
    reducer:{
       data: postsReducer 
    }
});

export default store;
