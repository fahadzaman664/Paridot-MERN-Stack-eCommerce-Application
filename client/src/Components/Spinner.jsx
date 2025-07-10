import React, { Component } from 'react'
const Spinner = () => {
    return (
        <div className="flex justify-center items-center min-h-[200px]">
            <img className='my-3' src="/loading.gif" alt="loading" />
        </div>
    )
}

export default Spinner