import React, { useState } from 'react';
import { useSelector } from 'react-redux';

const SingleMyTask = ({task,handleCompleteTask,handleDeleteTask}) => {
    const theme = useSelector(state => state.darkToggleMode)

    const {taskname,details,image,date,_id} = task
    const [viewDetails, setViewDetails] = useState(false)
    return (
        <div className='w-full  my-5 flex justify-center'>
         
            <div className={`md:w-2/3 p-2  ${theme ? "bg-[#89e5f0] ": "  bg-[#315682]"}`}>
                <div className='px-4 grid grid-cols-1 md:grid-cols-6 justify-center items-center md:gap-6 gap-2'>
                <img src={image} alt={taskname} className="h-8 w-8 rounded-full" />
                <h1>{taskname}</h1>
                <p>{date}</p>
                <button onClick={()=>setViewDetails(!viewDetails)} className={`font-semibold text-sm rounded  ${theme ? "bg-[#bbe3e7] ": "  bg-[#0c141f]"}`}>View Details</button>
                <button onClick={()=>handleCompleteTask(_id)} className={`font-semibold text-sm rounded  ${theme ? "bg-[#bbe3e7] ": "  bg-[#0c141f]"}`}>Complete Task</button>
                <button className="mx-10  bg-[#ff5d5d] font-bold h-6 w-6 text-xs rounded-full" onClick={()=>handleDeleteTask(_id)}>X</button>

                </div>
                <div className={` `}>
                {
                    viewDetails && <div className={`p-4 my-2 border border-black  flex items-center justify-between`}>
                        <p>{details}</p>
                        <button onClick={()=>setViewDetails(!viewDetails)} className="mx-10 bg-[#ff5d5d] font-bold h-6 w-6 text-xs rounded-full">X</button>
                    </div>
                }
            </div>
            </div>
          
        </div>
    );
};

export default SingleMyTask;