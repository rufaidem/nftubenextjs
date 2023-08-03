import Image from 'next/image'
import React from 'react'


const PostCard = ({ owner, title, image, handleClick }) => {
  return (

      <div className='sm:w-[288px] w-full rounded-[5px] postcard border border-gray-600 lg:w-[900px]'>
         <div class="flex items-start px-4 py-6">
      <img className="w-12 h-12 rounded-full object-cover mr-4 shadow" src="https://nftube.cam/assets/img/logo.png" alt="avatar" />
      <div class="">
         <div class="flex gap-3 items-center">
            <h2 class="text-lg font-semibold text-white -mt-1">NFTube</h2>
            <div className='mb-2'>
              <img src="https://png.pngtree.com/png-vector/20230408/ourmid/pngtree-instagram-bule-tick-insta-blue-star-vector-png-image_6695210.png" alt="verified" className='h-5 w-5' />
            </div>
            <div className='ml-auto'>
            <small class="text-sm text-gray-400">22h ago</small>
            </div>
         </div>
         <small class="text-gray-500 text-sm">@nftube</small>
         <p class="mt-3 text-white text-sm font-semibold">
           Welcome to NFTube, the revolutionary streaming platform empowering creators and users alike!
<br/><br/>
We are thrilled to embark on this incredible journey with all of you! NFTube is redefining content ownership and monetization, and we can't wait to see what our talented creators have in store for you. Stay tuned for exclusive content and engaging experiences. Let's create, share, and enjoy together! 

         </p>
         <div className='px-3 py-3 flex justify-center text-center overflow-hidden'>
            <img src="https://pbs.twimg.com/profile_banners/1671155709743091715/1687272859/1500x500" width={800} height={700} alt="web3" />
         </div>
         <div class="mt-4 flex items-center gap-x-6">
            <div class="flex mr-2 text-gray-700 text-sm">
               <svg fill="none" viewBox="0 0 24 24"  class="w-4 h-4 mr-1" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
                </svg>
               <span>12</span>
            </div>
            <div class="flex mr-2 text-gray-700 text-sm">
               <svg fill="none" viewBox="0 0 24 24" class="w-4 h-4 mr-1" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"/>
               </svg>
               <span>8</span>
            </div>
            <div class="flex mr-2 text-gray-700 text-sm">
               <svg fill="none" viewBox="0 0 24 24" class="w-4 h-4 mr-1" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"/>
                </svg>
               <span>share</span>
            </div>
         </div>
      </div>
   </div>
    </div>
  )
}

export default PostCard