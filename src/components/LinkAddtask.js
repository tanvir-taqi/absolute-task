import React from 'react';
import { NavLink } from 'react-router-dom';

const LinkAddtask = () => {
    return (
        <div className='fixed md:bottom-5 bottom-4 right-1 md:right-5'>
            <NavLink className={({ isActive }) => (isActive ? 'mr-4 text-lg font-extrabold   my-2 text-[#0c141f] ' : 'md:mr-4  font-extrabold bg-[#3d4b52] py-2 px-6 rounded-full text-5xl  my-2')} to='/addtask'>+</NavLink>

        </div>
    );
};

export default LinkAddtask;