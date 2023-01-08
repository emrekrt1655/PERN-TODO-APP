import { useContext } from "react"
import Todo from "./Todo"
import "./styles/todoList.scss"
import TodoForm from "./TodoForm"
import { TodoContext } from "../context/TodoContext"



const TodoList = ({ todoList, access_token, setIsAdded }) => {

  const { dayNight } = useContext(TodoContext)


  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <div className="todoListContainer">
        <h1 className={"title2 " + (dayNight && "nightText")}>What are you planing for today?</h1>


        <ul className="todoListContainer__listContainer">
          {
            todoList &&
            todoList?.map((todo, i) => {
              return (
                <Todo dayNight={dayNight} todoList={todoList} todo={todo} key={i} access_token={access_token} />)
            })
          }
        </ul>
        <TodoForm dayNight={dayNight} todoList={todoList} />
      </div>
    </div>
  )
}

export default TodoList