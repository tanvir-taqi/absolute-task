import { format } from 'date-fns';
import React, { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';
import LoadingSpinner from '../../components/LoadingSpinner';
import { AuthContext } from '../../userContext/UserContext';

const AddTask = () => {
    const {  loading ,user } = useContext(AuthContext);
    const [errorMsg, setErrorMsg] = useState('')
    const [addtaskLoader, setAddtaskLoader] = useState(false)
    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    const navigate = useNavigate();

    const imagebbKey = 'af103b523bcaf6592887e548fdc50a61'
    const handleaddTask = data => {
        setAddtaskLoader(true)
    
        const date = format(new Date(), 'dd/mm/yyyy')

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

                    const task = {
                        taskname:data?.taskname,
                        details:data?.details,
                        image:imgData?.data?.url,
                        userEmail:user?.email,
                        date,
                        status:"Incomplete"
                    }

                    fetch('https://absolute-task-server.vercel.app/tasks', {
                        method: 'POST',
                        headers: {
                            'content-type': 'application/json'
                        },
                        body: JSON.stringify(task)
                    })
                        .then(res => res.json())
                        .then(data => {
                            setAddtaskLoader(false)
                            navigate("/mytask");
                            reset()
                        })
                }
            })

    }



    useEffect(() => {
        window.scrollTo(0, 0);
    })


    if (loading || addtaskLoader) {
        return <LoadingSpinner></LoadingSpinner>
    }
    return (
        <div className=" py-32 w-full flex justify-center">
            <div className='p-10 bg-cyan-200 '>
                <h1 className="text-center font-bold text-2xl">Add Task</h1>
                <form onSubmit={handleSubmit(handleaddTask)}>


                    <div className="form-control w-full max-w-xs">
                        <label className="label"> <span className="label-text">Photo</span></label>
                        <input type="file" {...register("img", {
                            required: "Image is Required"
                        })} className=" w-full max-w-xs" />
                        {errors.img && <p className='text-red-500'>{errors.img.message}</p>}
                    </div>

                    <div className="form-control w-full max-w-xs">
                        <label className="label"> <span className="label-text">Name</span></label>
                        <input type="text" {...register("taskname", {
                            required: "Task Name is Required"
                        })} className="input input-bordered w-full max-w-xs" />
                        {errors.taskname && <p className='text-red-500'>{errors.taskname.message}</p>}
                    </div>


                    <div className="form-control w-full max-w-xs">
                        <label className="label"> <span className="label-text">Details</span></label>
                        <input type="text" {...register("details", {
                            required: "Details is Required"
                        })} className="input input-bordered w-full max-w-xs" />
                        {errors.details && <p className='text-red-500'>{errors.details.message}</p>}
                    </div>


                    <p className='text-red-500 font-semibold'>{errorMsg}</p>

                    <input className='btn  mt-4 bg-cyan-700' value="Add Task" type="submit" />


                </form>
            </div>

        </div>
    );
};

export default AddTask;