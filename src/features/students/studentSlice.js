import { createSlice } from "@reduxjs/toolkit";

export const studentSlice = createSlice({
    name: 'students',
    initialState: [],
    reducers: {
        getAllStudent: (state, action) => {
            state = [];
            const student = action.payload;
            return [...state, ...student]
        },
        addOneStudent: (state, action) => {
            const student = action.payload;
            return [...state, student]
        }
    }
})

export const { getAllStudent, addOneStudent } = studentSlice.actions;
export default studentSlice.reducer