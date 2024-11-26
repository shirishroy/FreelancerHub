import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
    name : 'ui',
    initialState : {
        something : null,
        skillSelectorContent : [],
        resumeLink : null,
        imageLink : null,
    },
    reducers : {
        setSomething(state, action){
            const newState = {
                ...state,
                something : action.payload.value
            }
            return newState;
        },
        setSkillSelectorContent(state, action){
            const newState = {
                ...state,
                skillSelectorContent : action.payload.value
            }
            return newState;
        },
        setResumeLink(state, action){
            const newState = {
                ...state,
                resumeLink : action.payload.value
            }
            return newState;
        },
        setImageLink(state, action){
            const newState = {
                ...state,
                imageLink : action.payload.value
            }
            return newState;
        }
    }
});

export const uiActions = uiSlice.actions;
export default uiSlice.reducer;