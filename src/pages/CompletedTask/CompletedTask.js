import { useQuery } from '@tanstack/react-query';
import React, { useContext, useState } from 'react';
import LoadingSpinner from '../../components/LoadingSpinner';

import { AuthContext } from '../../userContext/UserContext';
import SingleCompletedMyTask from './SingleCompletedMyTask';


const CompletedTask = () => {
    const { user, loading } = useContext(AuthContext)
    const [taskLoading, setTaskLoading] = useState(false)
    


    const { data: myCompletedtasks = [], isLoading, refetch } = useQuery({
        queryKey: ['compeletedtasks', user?.email],
        queryFn: async () => {
            const res = await fetch(`https://absolute-task-server.vercel.app/compeletedtasks?email=${user?.email}`)
            const data = await res.json();
            return data
        }

    })

    const handleDeleteTask = (id)=>{
        fetch(`https://absolute-task-server.vercel.app/compeletedtasks/${id}`,{
            method: 'DELETE',
        })
        .then(res=>res.json())
        .then(data =>{
            console.log(data);
            refetch();
        })

    }

    const handleInCompleteTask = (taskID) => {
            setTaskLoading(true)
            fetch(`https://absolute-task-server.vercel.app/mytasks/${taskID}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({ status: 'Incomplete' })
        }).then(res => res.json()).then(data => {
                console.log(data)
                setTaskLoading(false)
                refetch()
                
            })
            .catch(err => {
                refetch()
                setTaskLoading(false)

                console.log(err)
            })
        
       
       

    }

    if (loading || isLoading || taskLoading) {
        return <LoadingSpinner></LoadingSpinner>

    }



    return (
        <div className='py-10'>
            <h1 className='text-4xl font-extrabold text-center mb-12'>My Completed Tasks</h1>            

            <div>
                {
                    myCompletedtasks.length <= 0 ? <div>
                        <h4 className='text-2xl my-8 font-semibold text-center'>You have no tasks to do right now.</h4>
                    </div>
                        : <div className='grid grid-cols-1 gap-4 justify-center items-center ' >
                            {
                                myCompletedtasks.map((task) => <SingleCompletedMyTask
                                    key={task._id}
                                    task={task}
                                    handleCompleteTask={handleInCompleteTask}
                                    handleDeleteTask={handleDeleteTask}
                                ></SingleCompletedMyTask>)

                            }
                        </div>
                }
            </div>
        </div>
    );
};

export default CompletedTask;