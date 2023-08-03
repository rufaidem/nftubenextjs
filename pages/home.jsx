import React, { useState } from 'react'
import DisplayPosts from '../src/components/DisplayPosts'
import User from './user';
import { getSession } from 'next-auth/react';
import connectDB from '../lib/connectDB';
import Users from '../lib/userSchema';
import PrivateRoute from '../src/utils/PrivateRoute';

const Home = () => {

  const [isLoading, setIsLoading] = useState(false);
  const [posts, setPosts] = useState([]);

  const fetchPosts = async () => {
    setIsLoading(true);
    const data = await getPosts();
    setPosts(data);
    setIsLoading(false);
  }
  return (
    <PrivateRoute>
        <User>
    <DisplayPosts 
      title="All Posts"
      isLoading={isLoading}
      posts={posts}
    />
    </User>
    </PrivateRoute>
    
  )
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


export default Home