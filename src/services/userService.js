import { toast } from 'react-toastify';
import axios from "axios";

axios.defaults.baseURL = 'http://localhost:8000/';
export const login = async data => {
    try {
        return await axios({
            method: 'post',
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            url: '/auth/login',
            data: { phone: data.phone, password: data.password }
        });
    }
    catch (e) {
        console.log(e);
        return (toast.error(e.response.data.message))
    };
}
export const register = async data => {
    try {
        return await axios({
            method: 'post',
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            url: '/auth/register',
            data: { userName: data.userName, phone: data.phone, password: data.password  }
        });
    }
    catch (e) {
        return (toast.error(e.response.data.message))
    }
    ;
}
export const getUser = async values => {
    return axios.get("/auth/users", {
        params: { token: values }
    })
}

export const getStudents = async ()=>{
    return axios.get("/students")
}

export const getClass = async ()=>{
    return axios.get("/class")
}

export const addStudent = async (data) =>{
    try {
       return await axios({
            method: 'post',
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            url: '/students',
            data: {
                studentName: data.studentName,
                dateOfBirth: data.dateOfBirth,
                address: data.address,
                gender: data.gender,
                image: data.image,
                studyClass: data.studyClassId
            }
        })
    }
    catch (e) {
        return (toast.error(e.response.data.message))
    };
}

export const deleteStudentApi = async (id) =>{
    try {
        const url = `/students/${id}`
        console.log(url)
        return await axios.delete(`/students/${id}`)
    } 
    catch(e) {
        return (toast.error(e.response.data.message))
    };
    
}