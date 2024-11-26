import { createSlice } from "@reduxjs/toolkit";

const dataSlice = createSlice({
    name : 'data',
    initialState : {
        jobs : [],
        freelancers : []        
    },
    reducers : {
        setJobs(state, action){
            const newState = {
                ...state,
                jobs : action.payload.value
            }
            return newState;
        },
        setFreelancers(state, action){
            const newState = {
                ...state,
                freelancers : action.payload.value
            }
            return newState;
        }
    }
});

export const dataActions = dataSlice.actions;
export default dataSlice.reducer;