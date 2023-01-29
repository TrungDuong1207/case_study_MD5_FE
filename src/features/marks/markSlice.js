import { createSlice } from "@reduxjs/toolkit";

export const markSlice = createSlice({
    name: 'marks',
    initialState: [],
    reducers: {
        getAllMark: (state, action) => {
            state = [];
            const marks = action.payload;
            return [...state, ...marks]
        },
        addOneMark: (state, action) => {
            const mark = action.payload;
            return [...state, mark]
        },
        
    }
})

export const { getAllMark, addOneMark } = markSlice.actions;
export default markSlice.reducer