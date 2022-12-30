import { GoogleAuthProvider } from 'firebase/auth';
import React, { useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../userContext/UserContext';
import { FaEye, FaEyeSlash, FaGoogle } from "react-icons/fa";
import LoadingSpinner from '../../components/LoadingSpinner';
import { useSelector } from 'react-redux';

const LoginForm = ({setLoginForm}) => {
    const { login, setLoading, loading, socialLogin } = useContext(AuthContext);
    const [showPass, setShowPass] = useState(false)
    const [errorMsg, setErrorMsg] = useState('')

    const navigate = useNavigate();
 
    const googleProvider = new GoogleAuthProvider()

    const theme = useSelector(state => state.darkToggleMode)

  

    const handleLogin = event => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;

        login(email, password)
            .then(result => {
                const user = result.user;
                setLoading(false)
                console.log(user);
                navigate("/mytask");
            })
            .catch(error => {

                setLoading(false)
                setErrorMsg("Wrong email or password")
            })
    }



    const handleSocialLogin = (provider) => {
        socialLogin(provider)
            .then(result => {
                const user = result.user;

                const dbProfile = {
                    displayName: user?.displayName,
                    email: user?.email,
                    photoURL: user?.photoURL
                }

                fetch('https://absolute-task-server.vercel.app/users', {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify(dbProfile)
                })
                    .then(res => res.json())
                    .then(data => {
                        navigate("/mytask");
                        setLoading(false)
                    })

            })
            .catch(error => {
                setLoading(false)
                console.log(error)
            });

    }

    useEffect(() => {
        window.scrollTo(0, 0);
    })

    if (loading) {
        return <LoadingSpinner></LoadingSpinner>

    }

    return (
        <div className=" py-32 w-full flex justify-center">
            <div className={`p-10 ${theme ? "bg-[#89e5f0] text-[#0c141fbd]": " text-[#d8eaec] bg-[#315682]"} w-96 `}>
                <h1 className="text-center font-bold text-2xl">Sign In</h1>
                <form onSubmit={handleLogin}>
                    <div className='flex flex-col my-3'>
                        <label htmlFor="email" className='font-bold'>Email</label>
                        <input type="email" name="email" id="email" placeholder="Email" className="p-2 w-full text-black" />
                    </div>
                    <div className='flex flex-col my-3'>
                        <div className='flex justify-between items-center'>
                            <label htmlFor="password" className='font-bold'>Password</label>
                            <span onClick={() => setShowPass(!showPass)}>
                                {
                                    showPass ?
                                        <FaEyeSlash className='text-red-600'></FaEyeSlash>
                                        :
                                        <FaEye className='text-stone-600' ></FaEye>

                                }
                            </span>
                        </div>
                        <input type={showPass ? 'text' : 'password'} name="password" id="password" placeholder="Password" className="p-2 w-full text-black" />
                    </div>
                    <p className='text-red-500 font-semibold'>{errorMsg}</p>

                    <input type="submit" className={`font-bold text-lg ${theme ? "bg-[#bbe3e7] ": "  bg-[#0c141f]"} py-2 px-4 rounded-3xl my-3 cursor-pointer`} value="Sign In" />
                </form>
                <h4>New to <strong>Absolute Tasks?</strong> <span onClick={()=>setLoginForm(false)} className="cursor-pointer  font-extrabold underline">Sign Up Now</span></h4>
                <button onClick={() => handleSocialLogin(googleProvider)} className='flex items center justify-center px-5 py-2 rounded-full my-5 bg-blue-500'> <span className='mt-1 mr-4'><FaGoogle></FaGoogle></span> Sign In With Google</button>
            </div>

        </div>
    );
};

export default LoginForm;