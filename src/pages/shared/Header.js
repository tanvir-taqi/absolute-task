import React, { useContext, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { AuthContext } from '../../userContext/UserContext';
import { BiAlignMiddle, BiUserCircle } from "react-icons/bi";


const Header = () => {
    const [display, setDisplay] = useState(false)

    const { user, logOut } = useContext(AuthContext);

    
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
            <div className={` bg-[#c6eaee] z-50 w-full header py-5 header-container  flex flex-col md:flex-row justify-around items-center`}>
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
                                <NavLink className={({ isActive }) => (isActive ? 'mr-4 text-lg font-semibold   my-2 text-cyan-700' : 'mr-4 text-lg font-semibold   my-2')} to='/mytask'>My Tasks</NavLink>
                                <NavLink className={({ isActive }) => (isActive ? 'mr-4 text-lg font-semibold   my-2 text-cyan-700' : 'mr-4 text-lg font-semibold   my-2')} to='/addtask'>Add Tasks</NavLink>
                                <NavLink className={({ isActive }) => (isActive ? 'mr-4 text-lg font-semibold   my-2 text-cyan-700' : 'mr-4 text-lg font-semibold   my-2')} to='/completedtask'>Completed Tasks</NavLink>
                                <div className='my-3'> {user?.photoURL ? <img src={user?.photoURL} alt="" className="w-8 h-8 rounded-full  " /> : <span className=''><BiUserCircle></BiUserCircle></span>}</div>
                                <button onClick={handleLogOut} className='md:mx-4 text-lg font-semibold my-2'>Sign Out</button>

                            </>
                               
                        }

                    </div>





                </div>
            </div>

        </div>
    )
};

export default Header;