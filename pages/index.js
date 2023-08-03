import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import loader from '../src/assets/loader.svg';

function HomePage() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to another page after 5 seconds
    const timeoutId = setTimeout(() => {
      router.push('/signin'); // Replace '/destination' with the URL of the page you want to redirect to
    }, 3000);

    // Clean up the timeout when the component unmounts
    return () => {
      clearTimeout(timeoutId);
    };
  }, [router]);

  return (
    <div className="bg-gray-900 h-[100vh] flex justify-center items-center">
      <div>
        <Image src={loader} />
      </div>
    </div>
  );
}

export default HomePage;
