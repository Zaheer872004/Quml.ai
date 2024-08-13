import { useRouter } from "next/router";
 import { useEffect } from "react";

const Index = () => {
  const router = useRouter();
  useEffect(() => {
    router.push("/home");
  }, [router]);
  return <div></div>;
};

export default Index;




// delete the home.jsx and 
// add here this below code
/**
 * 
  import Link from 'next/link';
import { useSession } from 'next-auth/react';

export default function Home() {
  const { data: session } = useSession();

  return (
    <div>
      <h1>Welcome to the Platform</h1>
      {session ? (
        <p>
          Logged in as {session.user.name}. <Link href="/dashboard">Go to Dashboard</Link>
        </p>
      ) : (
        <p>
          <Link href="/sign-in">Sign In</Link> or <Link href="/sign-up">Sign Up</Link>
        </p>
      )}
    </div>
  );
}

 */