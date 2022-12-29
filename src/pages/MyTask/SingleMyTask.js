import React, { useState } from 'react';

const SingleMyTask = ({task,handleCompleteTask}) => {
    const {taskname,details,image,date,_id} = task
    const [viewDetails, setViewDetails] = useState(false)
    return (
        <div className='w-full my-5 flex justify-center'>
         
            <div className={`md:w-2/3 `}>
                <div className='px-4 grid grid-cols-1 md:grid-cols-5 justify-center items-center md:gap-6 gap-2'>
                <img src={image} alt={taskname} className="h-8 w-8 rounded-full" />
                <h1>{taskname}</h1>
                <p>{date}</p>
                <button onClick={()=>setViewDetails(!viewDetails)}>View Details</button>
                <button onClick={()=>handleCompleteTask(_id)}>Complete Task</button>
                </div>
                <div className={` `}>
                {
                    viewDetails && <div className={`p-4  flex items-center justify-between`}>
                        <p>{details}</p>
                        <button onClick={()=>setViewDetails(!viewDetails)} className="mx-10 ">X</button>
                    </div>
                }
            </div>
            </div>
          
        </div>
    );
};

export default SingleMyTask;