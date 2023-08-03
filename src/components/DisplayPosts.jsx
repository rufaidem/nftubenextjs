import React from 'react'
import PostCard from './PostCard'
import loader from '../assets/loader.svg'


const DisplayPosts = ({ title, isLoading, posts }) => {

  return (
      <div className='w-full displayposts'>
      <h1 className='font-epilogue font-semibold text-[18px] text-white text-left'>{title}</h1>

      <div className='flex flex-wrap mt-[20px] gap-[26px]'>
        {!isLoading && (
            <img src={loader} alt="loader" className='w-[100px] hidden h-[100px] object-contain' />
        )}

        {!isLoading && (
            <p className='font-epilogue font-semibold text-[14px] leading-[30px] text-[#818183] hidden'>You have not created any posts yet</p>
        )}

        {!isLoading && 
        (
          <PostCard
          />)}
      </div>
    </div>

  )
}

export default DisplayPosts