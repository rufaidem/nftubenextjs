import React, { useEffect, useState } from 'react';
import { getSession, signOut } from 'next-auth/react';
import User from './user';
import link from '../src/assets/link.png';
import Image from 'next/image';
import avatar1 from '../src/assets/avatar.png';
import PrivateRoute from '../src/utils/PrivateRoute';
import Users from '../lib/userSchema';
import connectDB from '../lib/connectDB';
import axios from 'axios';

const ProfileModal = ({ visible, onClose, userName, setUserName, userBio, setUserBio, updateProfile }) => {
  
  if (!visible) return null;

  return (
    <div className='fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center'>
    <div className='bg-white p-2 rounded'>
      <button onClick={onClose}>X</button>
      <input
        type="text"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
        className='border border-gray-300 px-2 py-1 rounded-lg mt-2'
      />
      <input
        type="text"
        value={userBio}
        onChange={(e) => setUserBio(e.target.value)}
        className='border border-gray-300 px-2 py-1 rounded-lg mt-2'
      />
      <button onClick={updateProfile} className='bg-blue-600 text-white px-4 py-2 mt-2 rounded-lg'>
        Update Profile
      </button>
    </div>
  </div>
  )
}

const profile = ({ user, bio, name, avatar }) => {

  const [showProfileModal, setShowProfileModal] = useState(false)

  const handleOnClose = () => setShowProfileModal(false)

  const [value, changeValue] = useState("New name");
  const [userName, setUserName] = useState(name || "John Doe");
  const [userBio, setUserBio] = useState(bio || "This is my Bio");

  async function updateProfile() {
    await axios.post(
      "/api/updateProfile",
      { profileId: user.profileId, name: userName, bio: userBio },
      {
        headers: {
          "content-type": "application/json",
        },
      }
    );

    console.log("Profile Updated");
    location.reload();
  }

  const [address, setAddress] = useState('');

  useEffect(() => {
    if (typeof window.ethereum !== 'undefined') {
      const getAddress = async () => {
        try {
          const accounts = await window.ethereum.request({ method: 'eth_accounts' });

          if (accounts.length > 0) {
            setAddress(accounts[0]);
          }
        } catch (error) {
          console.error('Error fetching accounts:', error);
        }
      };

      getAddress();

      const handleAccountsChanged = (newAccounts) => {
        setAddress(newAccounts[0]);
      };

      window.ethereum.on('accountsChanged', handleAccountsChanged);

      return () => {
        window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
      };
    }
  }, []);

  const [selectedAvatar, setSelectedAvatar] = useState(null);

  async function updateProfile() {
    const formData = new FormData();
    formData.append("profileId", user.profileId);
    formData.append("name", userName);
    formData.append("bio", userBio);
    if (selectedAvatar) {
      formData.append("avatar", selectedAvatar);
    }

    await axios.post("/api/updateProfile", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    console.log("Profile Updated");
    location.reload();
  }

  // Function to update the avatar separately
  async function updateAvatar() {
    const formData = new FormData();
    formData.append("profileId", user.profileId);
    if (selectedAvatar) {
      formData.append("avatar", selectedAvatar);
    }

    await axios.post("/api/updateAvatar", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    console.log("Avatar Updated");
    location.reload();
  }
  

  return (
    <PrivateRoute>
      <User>
        <div className='bg-gray-800 border border-gray-700 rounded-lg'>
          {/* Desktop */}
          <div className='md:grid pt-10 px-5 border-b border-gray-700 hidden'>
            <div className='flex gap-x-96 items-center'>
              <div className='flex justify-between items-center gap-x-4'>
                <div className='rounded-full h-36 w-36 overflow-hidden'>
                {user.avatar ? (
    <Image src={user.avatar} alt="profile" width={144} height={144} />
  ) : (
    <Image src={avatar1} alt="default-avatar" width={144} height={144} />
  )}
                </div>

                <div>
                  <div className='flex gap-x-2'>
                    <h2 className='text-xl font-bold text-white'>{userName}</h2>
                    <img src="https://png.pngtree.com/png-vector/20230408/ourmid/pngtree-instagram-bule-tick-insta-blue-star-vector-png-image_6695210.png" alt="verified" className='h-7 w-7' />
                  </div>
                  <p className='text-base font-normal text-gray-500'><span className='text-emerald-500'>@</span>{address}</p>
                  <div className='flex justify-start'>
                    <div className='grid'>
                      <p className='text-sm font-light text-white mt-5'>{bio}</p>
                      <div className='flex items-center mt-2 gap-x-2'>
                        <Image src={link} alt="link" className='h-5 w-5' width={25} height={25} />
                        <p className='text-sm font-normal text-white'>link</p>
                      </div>
                    </div>
                  </div>
                  
          {/* ... your existing code */}

          <input
            type="file"
            accept="image/*"
            onChange={(e) => setSelectedAvatar(e.target.files[0])}
            className='mt-2'
          />

          <button
            onClick={updateAvatar}
            className='bg-blue-600 text-white px-4 py-2 mt-2 rounded-lg'
          >
            Update Avatar
          </button>
          
                  
                </div>
                <button onClick={() => setShowProfileModal(true)}>update profile</button>
                <ProfileModal
        visible={showProfileModal}
        onClose={handleOnClose}
        userName={userName}
        setUserName={setUserName}
        userBio={userBio}
        setUserBio={setUserBio}
        updateProfile={updateProfile}
      />
              </div>
            </div>
            <div className='flex justify-center mt-7 gap-x-[40%]'>
              <div className='hover:border-b-4 w-20 border-gray-500 flex justify-center'>
                <h2 className='text-white font-semibold text-lg'>Recent</h2>
              </div>
              <div className='hover:border-b-4 w-20 border-gray-500 flex justify-center'>
                <h2 className='text-white font-semibold text-lg'>Media</h2>
              </div>
            </div>
          </div>

          {/*Mobile view*/}
          <div className='lg:hidden grid border-b border-gray-700 pt-5 px-5'>
            <div className='rounded-full h-28 w-28 overflow-hidden'>
              <Image src={avatar} alt="profile" />
            </div>
            <div className='mt-5'>
              <div className='flex items-center'>
                <h3 className='text-lg font-bold text-white'>{userName}</h3>
                <img src="https://png.pngtree.com/png-vector/20230408/ourmid/pngtree-instagram-bule-tick-insta-blue-star-vector-png-image_6695210.png" alt="verified" className='h-5 w-5' />
              </div>
            

              <p className='text-sm font-light text-white mt-5'>Description</p>
              <div className='flex items-center mt-2 gap-x-2'>
                <Image src={link} alt="link" className='h-5 w-5' height={20} width={20} />
                <p className='text-sm font-normal text-white'>link</p>
              </div>
            </div>

            <div className='flex justify-center mt-7 gap-x-28'>
              <div className='hover:border-b-4 w-20 border-gray-500 flex justify-center'>
                <h2 className='text-white font-semibold text-lg'>Recent</h2>
              </div>
              <div className='hover:border-b-4 w-20 border-gray-500 flex justify-center'>
                <h2 className='text-white font-semibold text-lg'>Media</h2>
              </div>
            </div>
          </div>
          <div className='p-5'>
            <h2>Coming soon</h2>
          </div>
        </div>
      </User>
    </PrivateRoute>
  );
};



export async function getServerSideProps(context) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: '/signin',
        permanent: false,
      },
    };
  }

  await connectDB();

  const userM = await Users.findOne({ profileId: session?.user.profileId }).lean();

  if (userM !== null) {
    userM.bio = userM.bio.toString();
  }

  return {
      props: { user: session.user, bio: userM.bio },
  };
}



export default profile


