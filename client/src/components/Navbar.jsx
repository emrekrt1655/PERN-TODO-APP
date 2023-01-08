import { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import './styles/navbar.scss'
import { TodoContext } from "../context/TodoContext"

const Navbar = ({ hamburgerMenu, setHamburgerMenu }) => {

    const { dayNight } = useContext(TodoContext)

    const setOpen = () => setHamburgerMenu(!hamburgerMenu)

    return (
        <>
            <div className={(dayNight && ' night ') + ' navbar2 ' + (hamburgerMenu && 'active2 ')}>
                <div className='wrapper2' >
                    <div className='left2' >
                        <NavLink to='/' className='logo2'>
                            To&Do App
                        </NavLink>
                        <div className='itemContainer2'>
                            <span> more todo more better </span>
                        </div>
                    </div>
                    <div className='right2'>
                        <div className='hamburger2' onClick={setOpen}>
                            <span className="line1"></span>
                            <span className="line2"></span>
                            <span className="line3"></span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}


export default Navbar
