import axios from 'axios';
import { toast } from 'react-toastify';

// consts
const dataInitial = {
    array: [],
    user: {},
    userIsUpdating: false
}

const GET_USERS_SUCCESS = 'GET_USERS_SUCCESS';
const CREATE_USER_SUCCESS = 'CREATE_USER_SUCCESS';
const GET_USER_SUCCESS = 'GET_USER_SUCCESS';
const UPDATE_USER_SUCCESS = 'UPDATE_USER_SUCCESS';
const DELETE_USER_SUCCESS = 'DELETE_USER_SUCCESS';

// reducers
export default function userReducer(state = dataInitial, action) {
    switch(action.type) {
        case GET_USERS_SUCCESS:
            return {...state, array: action.payload}
        case CREATE_USER_SUCCESS:
            return {...state, array: action.payload}
        case GET_USER_SUCCESS:
            return {
                    ...state,
                    user: action.payload.user,
                    userIsUpdating: action.payload.userIsUpdating
                }
        case UPDATE_USER_SUCCESS:
            return {
                    ...state,
                    array: action.payload.array,
                    user: action.payload.user,
                    userIsUpdating: action.payload.userIsUpdating
                }
        case DELETE_USER_SUCCESS:
            return {...state, array: action.payload}
        default:
            return state
    }
}

// actions
// Get all users
export const getUsersAction = () => async (dispatch) => {
    try {
        const res = await axios.get('/api/v1.0/users/');
        dispatch({
            type: GET_USERS_SUCCESS,
            payload: res.data
        })
    } catch (error) {
        console.error(error)
    }
}
// Create an user
export const createUserAction = (name, lastname, age) => async (dispatch) => {
    try {
        const response = await axios.post('/api/v1.0/users/', {
            name: name,
            lastname: lastname,
            age: age
        })
        const resp = await axios.get('/api/v1.0/users/');
        dispatch({
            type: CREATE_USER_SUCCESS,
            payload: resp.data
        })
        toast(response.data.response, {
            type: "success",
        });
        console.log(response.data.response);
    } catch (error) {
        console.error(error);
    }
}
// Get an user
export const getUserAction = (user_id, name, lastname, age) => (dispatch) => {
    try {
        dispatch({
            type: GET_USER_SUCCESS,
            payload: {
                user: {
                    user_id,
                    name,
                    lastname,
                    age
                },
                userIsUpdating: true
            }
        })
    } catch (error) {
        console.error(error);
    }
}
// Update user
export const updateUserAction = (user_id, name, lastname, age) => async (dispatch, getState) => {
    try {
        const response = await axios.put(`/api/v1.0/users/${user_id}/`, {
            name,
            lastname,
            age
        });
        const res = await axios.get('/api/v1.0/users/');
        dispatch({
            type: UPDATE_USER_SUCCESS,
            payload: {array: res.data, user: {}, userIsUpdating: false}
        })
        toast(response.data.response, {
            type: "info",
        });
        console.log(response.data.response);
    } catch (error) {
        console.error(error);
    }
}
// Delete user
export const deleteUserAction = (user_id) => async (dispatch, getState) => {
    try {
        if (window.confirm("ARE YOU SURE TO DELETE THIS USER?")) {
            const response = await axios.delete(`/api/v1.0/users/${user_id}`);
            const res = await axios.get("/api/v1.0/users/");
            dispatch({
                type: DELETE_USER_SUCCESS,
                payload: res.data
            })
            toast(response.data.response, {
                type: "error",
            });
            console.log(response.data.response);
        }
    } catch (error) {
        console.error(error);
    }
}