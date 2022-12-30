
import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';

const SingleCompletedMyTask = ({ task, handleCompleteTask ,handleDeleteTask}) => {
    const { taskname, image, date, _id, userEmail } = task
    const [viewInput, setViewInput] = useState(false)
    const [viewComment, setViewComment] = useState(false)



    const { data: comments = [], isLoading, refetch } = useQuery({
        queryKey: ['comments', _id],
        queryFn: async () => {
            const res = await fetch(`https://absolute-task-server.vercel.app/comments/${_id}`)
            const data = await res.json();
            return data
        }

    })

    const addComments = (event) => {
        event.preventDefault()

        const form = event.target
        const msg = form.comment.value
        const comment = {

            comment: msg,
            taskId: _id,
            userEmail
        }
        fetch(`https://absolute-task-server.vercel.app/comments`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(comment)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setViewInput(false)
                refetch()
            })
    }
    return (
        <div className='w-full my-5 flex justify-center'>

            <div className={`md:w-2/3 `}>
                <div className='px-4 grid grid-cols-1 md:grid-cols-6 justify-center items-center md:gap-6 gap-2'>
                    <img src={image} alt={taskname} className="h-8 w-8 rounded-full" />
                    <h1>{taskname}</h1>
                    <p>{date}</p>
                    {
                        comments.length <= 0 ? <button onClick={() => setViewInput(!viewInput)}>Add Comment</button>
                            : <button onClick={() => setViewComment(!viewComment)}>View Comment</button>
                    }

                    <button onClick={() => handleCompleteTask(_id)}>Add to My Task</button>
                    <button className="mx-10 " onClick={()=>handleDeleteTask(_id)}>X</button>
                </div>
                <div className={` `}>
                    {
                        viewInput && <div className={`p-4 w-full flex flex-col items-center justify-between`}>
                            <form onSubmit={addComments} className={`p-4 w-full flex flex-col`}>
                                <textarea name="comment" id="comment" cols="30" rows="3" className='p-3' ></textarea>
                                <input type="submit" value="Add Comment" className="mx-10 bg-red-600" />
                            </form>

                        </div>
                    }
                    {
                        viewComment && <div className={` w-full px-8 py-4`}>
                            
                                {
                                    comments.map(cm => <div key={cm._id} className={`p-4  flex items-center justify-between`}>
                                        <p>{cm.comment}</p>
                                        <button onClick={() => setViewComment(!viewComment)} className="mx-10 ">X</button>
                                    </div>)
                                }
                           

                        </div>
                    }
                </div>
            </div>

        </div>
    );
};

export default SingleCompletedMyTask;