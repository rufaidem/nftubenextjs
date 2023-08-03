// components/PrivateRoute.js
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { ethers } from 'ethers';

const PrivateRoute = ({ children }) => {
  const router = useRouter();

  useEffect(() => {
    const checkMetaMaskConnection = async () => {
      // Check if MetaMask is available
      if (typeof window.ethereum === 'undefined') {
        return false;
      }

      // Check if MetaMask is connected
      try {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        return true;
      } catch (error) {
        return false;
      }
    };

    const isMetaMaskConnected = checkMetaMaskConnection();

    if (!isMetaMaskConnected) {
      // Redirect the user to another page
      router.push('/'); // Replace with the URL of the page for non-connected users
    }
  }, []);

  return <>{children}</>;
};

export default PrivateRoute;
