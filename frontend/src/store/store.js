import { configureStore } from '@reduxjs/toolkit';
import uiReducer from './ui-slice';
import userReducer from './user-slice';
import dataReducer from './data-slice';

const store = configureStore({
    reducer : {
        ui : uiReducer,
        user : userReducer,
        data : dataReducer
    }
});

export default store;