import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../userContext/UserContext';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

const Home = () => {
    const [loginForm, setLoginForm] = useState(true)
    const {user} = useContext(AuthContext)
    const navigate = useNavigate()
    if(user?.email){
        navigate("/mytask")
    }
    return (
        <div>
            <div className={` grid grid-cols-1 md:grid-cols-2`}>
                <div className='flex flex-col  items-center justify-center py-16'>
                    <div>
                        <h1 className='text-center text-3xl font-extrabold'>Your New Task manager.</h1>
                        <p className='text-center text-lg font-medium'>Tasks to do? Yes, Please!!</p>
                    </div>
                    <img src="task.png" alt="" className='w-96 h-96' />
                </div>
                <div>
                    {
                        loginForm ? <LoginForm setLoginForm={setLoginForm}></LoginForm> 
                        : <RegisterForm setLoginForm={setLoginForm}></RegisterForm>
                    }

                </div>
            </div>
        </div>
    );
};

export default Home;