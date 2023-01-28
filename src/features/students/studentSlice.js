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
        },
        deleteOneStudent: (state, action) =>{
            const id = action.payload;
            state.forEach((item,index)=>{
                if(item.id === id){
                    state.splice(index,1);
                }
            })
        }
    }
})

export const { getAllStudent, addOneStudent, deleteOneStudent } = studentSlice.actions;
export default studentSlice.reducer