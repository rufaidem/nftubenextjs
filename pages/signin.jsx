import { MetaMaskConnector } from 'wagmi/connectors/metaMask';
import { signIn } from 'next-auth/react';
import { useAccount, useConnect, useSignMessage, useDisconnect } from 'wagmi';
import { useRouter } from 'next/router';
import axios from 'axios';

function SignIn() {
    const { connectAsync } = useConnect();
    const { disconnectAsync } = useDisconnect();
    const { isConnected } = useAccount();
    const { signMessageAsync } = useSignMessage();
    const { push } = useRouter();

    const handleAuth = async () => {
        if (isConnected) {
            await disconnectAsync();
        }

        const { account, chain } = await connectAsync({ connector: new MetaMaskConnector() });

        const userData = { address: account, chain: chain.id, network: 'evm' };

        const { data } = await axios.post('/api/auth/request-message', userData, {
            headers: {
                'content-type': 'application/json',
            },
        });

        const message = data.message;

        const signature = await signMessageAsync({ message });

        // redirect user after success authentication to '/user' page
        const { url } = await signIn('credentials', { message, signature, redirect: false, callbackUrl: '/home' });
        /**
         * instead of using signIn(..., redirect: "/user")
         * we get the url from callback and push it to the router to avoid page refreshing
         */
        push(url);
    };

    return (
        <div className='flex justify-center items-center bg-gray-900 h-[100vh] px-2'>
          <div className='justify-center items-center grid px-10 bg-slate-700 rounded-xl shadow-md shadow-orange-500 py-2'>
            <h3 className='text-[40px] font-bold text-white'><span className='text-orange-500'>NFTTube</span> Authentication</h3>
            <button className='text-[20px] border-2 text-white hover:bg-green-500 border-green-500 py-1 px-2 rounded-full' onClick={() => handleAuth()}>Authenticate via Metamask</button>
          </div>
        </div>
    );
}

export default SignIn;
