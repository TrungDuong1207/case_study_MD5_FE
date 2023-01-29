import { configureStore } from "@reduxjs/toolkit";
import studentReducer from "../features/students/studentSlice";
import markReducer from "../features/marks/markSlice";

export const store = configureStore({
    reducer: {
        students: studentReducer,
        marks: markReducer
    }
})