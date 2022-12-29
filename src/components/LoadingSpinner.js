import React from 'react';

const LoadingSpinner = () => {
    return (
        <div className='flex justify-center items-center'>
             <div className="w-12 h-12  my-20 rounded-full animate-spin border-x-8 border-solid border-cyan-500 border-t-transparent"></div>
        </div>
    );
};

export default LoadingSpinner;