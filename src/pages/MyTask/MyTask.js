import { useQuery } from '@tanstack/react-query';

import React, { useContext,  useState } from 'react';
import LinkAddtask from '../../components/LinkAddtask';
import LoadingSpinner from '../../components/LoadingSpinner';
import { AuthContext } from '../../userContext/UserContext';
import SingleMyTask from './SingleMyTask';

const MyTask = () => {

    const { user, loading } = useContext(AuthContext)
    const [taskLoading, setTaskLoading] = useState(false)


    const { data: myTasks = [], isLoading, refetch } = useQuery({
        queryKey: ['mytasks', user?.email],
        queryFn: async () => {
            const res = await fetch(`https://absolute-task-server.vercel.app/mytasks?email=${user?.email}`)
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

    const handleCompleteTask = (taskID) => {
            setTaskLoading(true)
            fetch(`https://absolute-task-server.vercel.app/mytasks/${taskID}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({ status: 'Completed' })
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
            <LinkAddtask></LinkAddtask>
            <h1 className='text-4xl font-extrabold text-center mb-12'>My Tasks</h1>


            <div>
                {
                    myTasks.length <= 0 ? <div>
                        <h4 className='text-2xl my-8 font-semibold text-center'>You have no tasks to do right now.</h4>
                    </div>
                        : <div className='grid grid-cols-1 gap-4 justify-center items-center ' >
                            {
                                myTasks.map((task) => <SingleMyTask
                                    key={task._id}
                                    task={task}
                                    handleCompleteTask={handleCompleteTask}
                                    handleDeleteTask={handleDeleteTask}
                                ></SingleMyTask>)

                            }
                        </div>
                }
            </div>
        </div>
    );
};

export default MyTask;