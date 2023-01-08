import { useContext } from "react";
import './styles/menu.scss';
import { NavLink } from 'react-router-dom'
import { useSelector, useDispatch } from "react-redux"
import { logout } from "../redux/actions/authAction"
import { TodoContext } from "../context/TodoContext"

const Menu = ({ hamburgerMenu, setHamburgerMenu }) => {
    const dispatch = useDispatch()
    const setFalse = () => setHamburgerMenu(false)
    const { authReducer } = useSelector((state) => state)
    const token = authReducer?.access_token
    const { dayNight, setDayNight } = useContext(TodoContext)


    const onLogout = (() => {
        dispatch(logout(token)).then(() => setFalse()).then(() => setDayNight(false))
    })

    const onToggle = (() => {
        setDayNight(!dayNight)
    })


    return (
        <>
            <div className={'menu2 ' + (hamburgerMenu && 'active2')}>
                <ul>
                    {
                        authReducer?.access_token ?
                            <>
                                <li onClick={() => onToggle()} > {!dayNight ? "Day Shift" : "Night Shift"} </li>
                                <li> {authReducer?.user.userName} </li>
                                <li onClick={() => onLogout()}  > Logout </li>
                            </>
                            : <>
                                <li onClick={() => setFalse()}>  <NavLink to='/login'>Login </NavLink> </li>
                                <li onClick={() => setFalse()}>  <NavLink to='/register'>Register </NavLink> </li>
                            </>
                    }

                </ul>
            </div>
        </>
    )
}

export default Menu