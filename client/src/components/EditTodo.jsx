import { useState } from 'react'
import { useDispatch } from "react-redux"
import { editTodo, getTodos } from "../redux/actions/todoAction"



const EditTodo = ({ setIsEditable, todoId, todo, token, todoList, isEditable }) => {

  const dispatch = useDispatch()

  const initialState = {
    text: todo.text,
  }


  const [updatedTodo, setUpdatedTodo] = useState(initialState)

  const myStyle = {
    display: 'none'
  }




  const handleChange = (e) => {
    const { value, name } = e.target
    setUpdatedTodo({
      ...updatedTodo,
      [name]: value
    })
  }

  const handleEdit = (e) => {
    if (todoId && e.key === "Enter") {
      dispatch(editTodo(todoId, {
        todoId: todoId,
        text: updatedTodo.text,
        todoUserId: todo.todoUserId,
        todoDone: todo?.todoDone
      }, token, todoList)).then(setIsEditable(!isEditable)).then(() => {
        dispatch(getTodos(todo?.todoUserId))
      })
    }
  }


  return (
    <div style={!isEditable ? myStyle : null} >

      <input
        className="editText"
        placeholder={todo?.text}
        id="text"
        name="text"
        type="text"
        autoFocus
        value={updatedTodo?.text}
        onChange={handleChange}
        onKeyPress={handleEdit}

      />
      <input
        id="todoUserId"
        name="todoUserId"
        value={todo?.todoUserId}
        readOnly
        style={{ display: 'none' }}

      />




    </div>
  )
}

export default EditTodo