// Sidebar.js
import React, { useState } from 'react';
import Link from 'next/link';
import logo from '../assets/logo.png';
import Image from 'next/image';
import { navlinks } from '../constants';
import { useRouter } from 'next/router';
import sun from '../assets/sun.svg'

const Icon = ({ styles, name, imgUrl, isActive, disabled, handleClick }) => (
  <div
    className={`w-[48px] h-[48px] rounded-[10px] ${isActive === name && 'bg-[#2c2f32]'} flex justify-center items-center ${!disabled && 'cursor-pointer'} ${styles}`}
    onClick={handleClick}
  >
    {!isActive ? (
      <Image src={imgUrl} alt="nftubelogo" width="40" height="40" className="w-1/2 h-1/2" />
    ) : (
      <Image
        src={imgUrl}
        alt="nftubelogo"
        className={`w-1/2 h-1/2 ${isActive !== name && 'grayscale'}`}
      />
    )}
  </div>
);

const Sidebar = () => {
  const router = useRouter();
  const [isActive, setIsActive] = useState('dashboard');

  const handleIconClick = (link, disabled) => {
    if (!disabled) {
      router.push(link);
    }
  };

  return (
    <div className="flex justify-between items-center flex-col sticky top-5 h-[93vh]">
      <Link href="/home">
        <a>
          <div>
            <Icon styles="w-[52px] h-[52px] bg-[#2c2f32]" imgUrl={logo} />
          </div>
        </a>
      </Link>

      <div className='flex-1 flex flex-col justify-between items-center bg-[#1c1c24] rounded-[20px] w-[76px] py-4 mt-12'>
        <div className='flex flex-col justify-center items-center gap-3'>
          {navlinks.map((link) => (
            <Icon
              key={link.name}
              {...link}
              isActive={isActive}
              handleClick={() => {
                if(!link.disabled) {
                    setIsActive(link.name);
                    handleIconClick(link.link)
                }
              }}
            />
          ))}
        </div>

        <Image styles="bg-[#1c1c24] shadow-secondary" width="30" height="30" src={sun} />
      </div>
    </div>
  );
};

export default Sidebar;
