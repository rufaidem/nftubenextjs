import { useRouter } from 'next/router'
import React, { useState, useEffect } from 'react'
import search from '../assets/search.svg'
import Image from 'next/image';
import Link from 'next/link';
import avatar from '../assets/avatar.png'
import { truncateAddress } from '../utils/AddressUtils'
import menu from '../assets/menu.svg'
import { navlinks } from '../constants';

const Navbar = () => {

    const [address, setAddress] = useState('');

  useEffect(() => {
    // Check if Ethereum is available in the window object
    if (typeof window.ethereum !== 'undefined') {
      const getAddress = async () => {
        try {
          // Request the accounts from Metamask
          const accounts = await window.ethereum.request({ method: 'eth_accounts' });

          // Check if accounts is not empty
          if (accounts.length > 0) {
            setAddress(accounts[0]); // Set the first account address as the connected address
          }
        } catch (error) {
          console.error('Error fetching accounts:', error);
        }
      };

      getAddress();

      // Listen for Metamask account change events
      const handleAccountsChanged = (newAccounts) => {
        setAddress(newAccounts[0]);
      };

      window.ethereum.on('accountsChanged', handleAccountsChanged);

      // Cleanup the event listener when the component unmounts
      return () => {
        window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
      };
    }
  }, []);

    const navigate = useRouter();
    const [isActive, setIsActive] = useState('home');
    const [toggleDrawer, setToggleDrawer] = useState(false);
    const router = useRouter()
    const handleIconClick = (link, disabled) => {
        if (!disabled) {
          router.push(link);
        }}
  return (
    <div className='flex md:flex-row flex-col-reverse justify-between mb-[35px] gap-6'>
      <div className='lg:flex-1 flex flex-row max-w-[458px] py-2 pl-4 pr-2 h-[52px] bg-[#1c1c24] rounded-[100px]'>
        <input type="text" placeholder='Search for users' className='flex w-full font-epilogue font-normal text-[14px] placeholder:text-[#4b5264] text-white bg-transparent outline-none' />
        <div className='w-[72px] h-full rounded-[20px] bg-[#cc7a44] flex justify-center items-center cursor-pointer'>
            <Image src={search} className='w-[15px] h-[15px] object-contain' alt="search" />
        </div>
      </div>

      <div className='sm:flex hidden flex-row justify-end gap-4'>
            <div className='flex rounded-full bg-orange-400 items-center justify-center p-2 w-36 h-10'>
                <h2 className='font-bold text-md text-white'>{truncateAddress(address)}</h2>
            </div>

            <a>
            <Link href='/profile'>
              <div className='w-[40px] h-[40px] flex justify-center items-center cursor-pointer rounded-full'>
                <Image src={avatar} />
              </div>
            </Link>
            </a>

        </div>
        {/**Mobile view */}
        <div className='sm:hidden flex justify-between items-center relative'>
            <div className='w-[40px] h-[40px] rounded-full bg-[#2c2f32] flex justify-center items-center cursor-pointer'>
              <Image src={avatar} />
            </div>

            <div className='flex rounded-full bg-orange-400 items-center justify-center p-2 w-28 h-7'>
                <h2 className='font-bold text-sm text-white'>{truncateAddress(address)}</h2>
            </div>

            <Image src={menu} className='cursor-pointer' onClick={() => setToggleDrawer((prev) => !prev)} />

            <div className={`absolute top-[60px] right-0 left-0 bg-[#1c1c24] z-10 shadow-secondary py-4 ${!toggleDrawer ? '-translate-y-[100vh]' : 'translate-y-0'} transition-all duration-700`}>
                <ul className='mb-4'>
                    {navlinks.map((link) => (
                        <li key={link.name} className={`flex p-4 ${isActive === link.name && 'bg-[3a3a43]'}`} onClick={() => {
                            setIsActive(link.name)
                            setToggleDrawer(false)
                            handleIconClick(link.link)

                        }}>
                            <Image src={link.imgUrl} className={`w-[24px] h-[24px] object-contain ${isActive === link.name ? 'grayscale-0' : 'grayscale'}`} />
                            <p className={`ml-[20px] font-epilogue font-semibold tex-[14px] ${isActive === link.name ? 'text-[#c0591d]' : 'text-[#808191]'}`}>{link.name}</p>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    </div>
  )
}

export default Navbar
