import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name : 'user',
    initialState : {
        user : null,
    },
    reducers : {
        setUser(state, action){
            const newState = {
                ...state,
                user : action.payload.value
            }
            return newState;
        }
    }
});

export const userActions = userSlice.actions;
export default userSlice.reducer;