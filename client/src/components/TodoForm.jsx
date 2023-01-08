import { useState } from 'react'
import { useSelector, useDispatch } from "react-redux"
import { createTodo, getTodos } from "../redux/actions/todoAction"
import "./styles/todoForm.scss"


const TodoForm = ({ todoList, dayNight }) => {
    const dispatch = useDispatch()
    const { authReducer } = useSelector(state => state)

    const token = authReducer?.access_token
    const userId = authReducer?.user?.userId

    const initialState = {
        text: "",
        todoUserId: userId,
        todoDone: "todo"
    }



    const [todo, setTodo] = useState(initialState)




    const handleSubmit = (e) => {

        if (userId && e.key === "Enter") {
            dispatch(createTodo(todo, token, todoList)).then(() => {
                dispatch(getTodos(userId)).then(() => {
                    setTodo(initialState)
                })
            })
        }
    }

    const handleChange = (e) => {
        const { value, name } = e.target
        setTodo({
            ...todo,
            [name]: value
        })
    }


    return (
        <div className="todoForm" >
            <input
                className={dayNight ? "nightInput" : null}
                placeholder="Please add something.."
                id="text"
                name="text"
                type="text"
                value={todo?.text}
                onChange={handleChange}
                onKeyPress={handleSubmit}
            />
            <input
                id="todoUserId"
                name="todoUserId"
                value={todo?.todoUserId}
                readOnly
                style={{ display: 'none' }}

            />

            <input
                id="todoDone"
                name="todoDone"
                value={todo?.todoDone}
                readOnly
                style={{ display: 'none' }}

            />


        </div>
    )
}

export default TodoForm