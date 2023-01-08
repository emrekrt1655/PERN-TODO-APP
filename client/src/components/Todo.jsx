import { useState } from 'react'
import "./styles/todo.scss"
import { deleteTodo, doneTodo, getTodos } from "../redux/actions/todoAction"
import { useDispatch } from "react-redux";
import TodoEdit from "./EditTodo"


const Todo = ({ todo, access_token, todoList, dayNight }) => {

  const [isEditable, setIsEditable] = useState(false)


  const todoId = todo?.todoId

  const dispatch = useDispatch()

  const token = access_token

  const handleDelete = () => {
    todoId &&
      dispatch(deleteTodo(todoId, token, todoList))
  }


  const handleDone = () => {
    todoId &&
      dispatch(doneTodo(todoId, {
        todoId: todoId,
        text: todo.text,
        todoUserId: todo.todoUserId,
        todoDone: todo?.todoDone === "todo" ? "done" : "todo",
      }, token, todoList)).then(() => {
        dispatch(getTodos(todo.todoUserId))
      })
  }



  const onEdit = () => {
    setIsEditable(!isEditable)
  }




  return (

    <div key={todo?.todoId} className={"singleTodo " + (dayNight && "nighty")}>
      {
        isEditable ? <TodoEdit setIsEditable={setIsEditable} todoList={todoList} isEditable={isEditable} todoId={todoId} todo={todo} token={token} />
          : <span onClick={() => handleDone()} className={todo?.todoDone === "todo" ? "singleTodo__todoText " + (dayNight && "nightText") : "singleTodo__todoDoneText " + (dayNight && "nightText")}>{todo?.text}</span>
      }


      <div className={"singleTodo__iconContainer " + (dayNight && "nightText")} >

        <svg onClick={() => onEdit()} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pen" viewBox="0 0 16 16">
          <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001zm-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708l-1.585-1.585z" />
        </svg>
        <svg onClick={() => handleDone()} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-check2-square" viewBox="0 0 16 16">
          <path d="M3 14.5A1.5 1.5 0 0 1 1.5 13V3A1.5 1.5 0 0 1 3 1.5h8a.5.5 0 0 1 0 1H3a.5.5 0 0 0-.5.5v10a.5.5 0 0 0 .5.5h10a.5.5 0 0 0 .5-.5V8a.5.5 0 0 1 1 0v5a1.5 1.5 0 0 1-1.5 1.5H3z" />
          <path d="m8.354 10.354 7-7a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0z" />
        </svg>

        <svg onClick={() => handleDelete()} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-archive" viewBox="0 0 16 16">
          <path d="M0 2a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1v7.5a2.5 2.5 0 0 1-2.5 2.5h-9A2.5 2.5 0 0 1 1 12.5V5a1 1 0 0 1-1-1V2zm2 3v7.5A1.5 1.5 0 0 0 3.5 14h9a1.5 1.5 0 0 0 1.5-1.5V5H2zm13-3H1v2h14V2zM5 7.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5z" />
        </svg>
      </div>



    </div>

  )
}

export default Todo