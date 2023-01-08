import { TODO, ALERT } from "../types/types"
import { postAPI, getAPI, deleteAPI, putAPI } from "../../utils/api"


export const createTodo = (todo, token, todoList) => async (dispatch) => {
    try {
        const res = await postAPI("/todo/create", todo, token);
        dispatch({
            type: TODO,
            payload: {
                status: "success",
                message: "All todos found",
                data: [...todoList]
            }
        })
        dispatch({ type: ALERT, payload: { success: res.data.message } })
    } catch (error) {
        dispatch({ type: ALERT, payload: { errors: error?.response?.data.message } })
    }
};


export const getTodos = (userId) => async (dispatch) => {
    try {
        const res = await getAPI(`/todo/get/${userId}`)
        dispatch({
            type: TODO,
            payload: res.data
        })
    } catch (error) {
        dispatch({ type: ALERT, payload: { errors: error?.response?.data.message } })
    }
}

export const deleteTodo = (todoId, token, todoList) => async (dispatch) => {
    try {
        const res = await deleteAPI(`/todo/delete/${todoId}`, token)
        dispatch({
            type: TODO,
            payload: {
                status: "success",
                message: "All todos found",
                data: todoList?.filter((todo) => todo?.todoId !== todoId)
            }
        })
        dispatch({ type: ALERT, payload: { success: res.data.message } })
    } catch (error) {
        dispatch({ type: ALERT, payload: { errors: error?.response?.data.message } })
    }
}


export const doneTodo = (todoId, todo, token, todoList) => async (dispatch) => {
    try {
        const res = await putAPI(`/todo/done/${todoId}`, todo, token)
        dispatch({
            type: TODO,
            payload: { data: [...todoList] }
        })
        dispatch({ type: ALERT, payload: { success: res.data.message } })
    } catch (error) {
        dispatch({ type: ALERT, payload: { errors: error?.response?.data.message } })

    }
}


export const editTodo = (todoId, todo, token, todoList) => async (dispatch) => {
    try {
        const res = await putAPI(`/todo/update/${todoId}`, todo, token)
        console.log(todo)
        dispatch({
            type: TODO,
            payload: { data: [...todoList] }
        })
        dispatch({ type: ALERT, payload: { success: res.data.message } })
    } catch (error) {
        dispatch({ type: ALERT, payload: { errors: error?.response?.data.message } })

    }
}