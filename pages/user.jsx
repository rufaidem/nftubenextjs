import { getSession, signOut } from 'next-auth/react';
import Users from "../lib/userSchema";
import connectDB from "../lib/connectDB";
import { useState } from "react";
import axios from "axios";
import Link from 'next/link';
import Sidebar from '../src/components/Sidebar';
import Navbar from '../src/components/Navbar';


function User({ user, bio, children }) {


    const [value, changeValue] = useState("New Bio");

    async function updateBio(){
        const {data} = await axios.post(
            "/api/updateBio",
            { profileId: user.profileId, bio: value },
            {
              headers: {
                "content-type": "application/json",
              },
            }
          );

          console.log("Bio Updated to: " + data.bio)

          location.reload()
    }

    return (
        <div className='relative sm:-8 p-4 bg-[#13131a] min-h-screen flex flex-row'>
          <div className='sm:flex hidden mr-10 relative'>
            <Sidebar />
          </div>

          <div className='flex-1 max-sm:w-full max-w-[1280px] mx-auto sm:pr-5'>
            <Navbar />
            {children}
          </div>
        </div>
    );
}

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

export default User;
