import React, { useContext, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../../userContext/UserContext';
import { BiAlignMiddle, BiUserCircle } from "react-icons/bi";
import { useDispatch, useSelector } from 'react-redux';
import { darkConvert } from '../../actions';
import { FaMoon, FaSun } from 'react-icons/fa';


const Header = () => {
    const theme = useSelector((state) => state.darkToggleMode)
    const dispatch = useDispatch()

    const [display, setDisplay] = useState(false)

    const { user, logOut } = useContext(AuthContext);

    console.log(theme)
    const handleLogOut = () => {
        const agreeToLogout = window.confirm("Are You Sure?")
        if (agreeToLogout) {
            logOut()
                .then(res => { })
                .catch(err => console.log(err))
        }
    }

    return (
        <div className='' >
            <div className={` ${theme ? "bg-[#89e5f0] text-[#0c141fbd]": " text-[#d8eaec] bg-[#315682]"} z-50 w-full header py-5 header-container  flex flex-col md:flex-row justify-around items-center`}>
                <div className="header-logo flex justify-around around items-center w-full  md:w-1/6">

                    {/* header logo and name  */}

                    <h1 className={`text-[#0c141f] font-bold   text-lg md:text-3xl`}>Absolute Tasks</h1>


                    <button className='block md:hidden' onClick={() => setDisplay(!display)}><BiAlignMiddle></BiAlignMiddle></button>
                </div>
                {/* header links  */}
                <div className={`nav-menu flex  md:items-center flex-col md:flex-row   ${display ? 'flex' : 'hidden md:flex'}`} >
                    <div onClick={() => setDisplay(false)} className=" items-start flex flex-col md:flex-row py-12 md:py-1 ">

                        {
                            user && <>
                                <NavLink className={({ isActive }) => (isActive ? 'mr-4 text-lg font-semibold   my-2 text-[#0c141f] ' : 'mr-4 text-lg font-semibold   my-2')} to='/mytask'>My Tasks</NavLink>
                                <NavLink className={({ isActive }) => (isActive ? 'mr-4 text-lg font-semibold   my-2 text-[#0c141f] ' : 'mr-4 text-lg font-semibold   my-2')} to='/addtask'>Add Tasks</NavLink>
                                <NavLink className={({ isActive }) => (isActive ? 'mr-4 text-lg font-semibold   my-2 text-[#0c141f] ' : 'mr-4 text-lg font-semibold   my-2')} to='/completedtask'>Completed Tasks</NavLink>
                                <div className='my-3'> {user?.photoURL ? <img src={user?.photoURL} alt="" className="w-8 h-8 rounded-full  " /> : <span className=''><BiUserCircle></BiUserCircle></span>}</div>
                                <button onClick={handleLogOut} className='md:mx-4 text-lg font-semibold my-2'>Sign Out</button>

                            </>

                        }
                        <>
                        <button onClick={()=>dispatch(darkConvert())} className='md:mx-4 text-lg font-semibold mt-3'>{theme ? <FaMoon></FaMoon> : <FaSun></FaSun>}</button>
                        </>


                    </div>





                </div>
            </div>

        </div>
    )
};

export default Header;