
import { useEffect, useContext } from "react"
import TodoList from "../components/TodoList"
import { useSelector, useDispatch } from "react-redux"
import { getTodos } from "../redux/actions/todoAction"
import { TodoContext } from "../context/TodoContext"
import HomepageLogout from "../components/HomepageLogout"
import './styles/homepage.scss'



const Homepage = ({ setHamburgerMenu }) => {

  const dispatch = useDispatch()
  const { dayNight } = useContext(TodoContext)
  const { authReducer, todoReducer } = useSelector((state) => state)
  const userId = authReducer?.user?.userId
  const access_token = authReducer?.access_token
  
  let todoList = todoReducer ? todoReducer?.data : [];
  
  useEffect(() => {
    userId && dispatch(getTodos(userId))
  }, [userId, dispatch])
  
   todoList =  todoList?.length > 0 && todoList?.sort((a, b) => {
    return new Date(b.updatedAt) - new Date(a.updatedAt);
    
  })




  



  const unTodos = todoList?.length > 0 ? todoList?.filter(todo => todo?.todoDone === "todo") : []
  const doneTodos = todoList?.length > 0 ? todoList?.filter(todo => todo?.todoDone === "done") : []



  const todos = [...unTodos, ...doneTodos]


  return (
  userId ?   ( <div onClick={() => setHamburgerMenu(false)} className={"homePage " + (dayNight && "night")} >




      <TodoList todoList={todos} access_token={access_token} />





    </div>) :

    <HomepageLogout />





  )


}


export default Homepage