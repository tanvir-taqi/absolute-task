import React, { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import LoadingSpinner from '../../components/LoadingSpinner';
import { AuthContext } from '../../userContext/UserContext';

const RegisterForm = ({setLoginForm}) => {
    const { createUser, userUpdate, setLoading, loading } = useContext(AuthContext);
    const [errorMsg, setErrorMsg] = useState('')
    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    const navigate = useNavigate();
    const location = useLocation();
    const theme = useSelector(state => state.darkToggleMode)



    const from = location.state?.from?.pathname || "/mytask";

    const imagebbKey = 'af103b523bcaf6592887e548fdc50a61'
    const handleSignUp = data => {
        setLoading(true)
        if (data.password !== data.confirm) {
            return setErrorMsg("Password did not match")
        } else {
            const image = data.img[0]
            const formData = new FormData()
            formData.append('image', image)
            const url = `https://api.imgbb.com/1/upload?key=${imagebbKey}`
            fetch(url, {
                method: 'POST',
                body: formData
            })
                .then(res => res.json())
                .then(imgData => {
                    
                    if (imgData.success) {
                        createUser(data.email, data.password)
                            .then(result => {
                                const user = result.user;
    
                                        const userInfo = {
                                            displayName: data.name,
                                            photoURL: imgData.data.url
                                        }
                                        userUpdate(userInfo)
                                            .then(() => {
                                                const dbProfile = {
                                                    displayName: data.name,
                                                    email: data.email,
                                                   
                                                    photoURL: imgData.data.url
                                                }
        
                                                addUserToDb(dbProfile)
                                            })
                                            .catch(err => {
                                                setLoading(false)
                                                console.log(err)
                                            });
                           
                            })
                            .catch(error => {
                                setLoading(false)
                                if(error){
                                    setErrorMsg("Password should be at least 6 characters") 
                                }

                            });
                    }
                })
        }
    }

    const addUserToDb = (dbprofile) => {

        fetch('https://absolute-task-server.vercel.app/users', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(dbprofile)
        })
            .then(res => res.json())
            .then(data => {
                
                setLoading(false)
                navigate("/mytask");
            })
    }

    useEffect(()=>{
        window.scrollTo(0,0);
    })


    if (loading) {
        return <LoadingSpinner></LoadingSpinner>
    }
    return (
        <div className=" py-32 w-full flex justify-center">
            <div className={`p-10 ${theme ? "bg-[#89e5f0] text-[#0c141fbd]": " text-[#d8eaec] bg-[#315682]"} w-96`}>
                <h1 className="text-center font-bold text-2xl">Sign Up</h1>
                <form onSubmit={handleSubmit(handleSignUp)}>


                    <div className="form-control w-full max-w-xs">
                        <label className="label"> <span className="label-text">Name</span></label>
                        <input type="text" {...register("name", {
                            required: "Name is Required"
                        })} className="input input-bordered w-full p-2 text-black" />
                        {errors.name && <p className='text-red-500'>{errors.name.message}</p>}
                    </div>


                    <div className="form-control w-full max-w-xs">
                        <label className="label"> <span className="label-text">Email</span></label>
                        <input type="email" {...register("email", {
                            required: true
                        })} className="input input-bordered w-full p-2 text-black" />
                        {errors.email && <p className='text-red-500'>{errors.email.message}</p>}
                    </div>

                    <div className="form-control w-full max-w-xs">
                        <label className="label"> <span className="label-text">Photo</span></label>
                        <input type="file" {...register("img", {
                            required: "Image is Required"
                        })} className=" w-full p-2 " />
                        {errors.img && <p className='text-red-500'>{errors.img.message}</p>}
                    </div>


                    <div className="form-control w-full max-w-xs">
                        <label className="label"> <span className="label-text">Password</span></label>
                        <input type="password" {...register("password", {
                            required: true
                        })} className="input input-bordered p-2 w-full text-black" />
                        {errors.email && <p className='text-red-500'>{errors.email.message}</p>}
                    </div>


                    <div className="form-control w-full max-w-xs">
                        <label className="label"> <span className="label-text">Confirm Password</span></label>
                        <input type="password" {...register("confirm", {
                            required: true
                        })} className="input input-bordered p-2 w-full text-black" />
                        {errors.confirm && <p className='text-red-500'>{errors.confirm.message}</p>}
                    </div>

                    <p className='text-red-500 font-semibold'>{errorMsg}</p>

                    <input className={`btn  py-2 px-4 rounded-3xl my-3 cursor-pointer ${theme ? "bg-[#bbe3e7] ": "  bg-[#0c141f]"}`} value="Sign Up" type="submit" />


                </form>
                <h4>Already Have an Account? <span  className="cursor-pointer  font-extrabold underline" onClick={()=>setLoginForm(true)}>Sign In Now</span></h4>
            </div>

        </div>
    );
};

export default RegisterForm;