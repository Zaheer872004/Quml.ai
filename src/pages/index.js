import { useRouter } from "next/router";
import { useEffect } from "react";
import { useSession } from "next-auth/react";

const Index = () => {
  const router = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => {
    // Ensure the router is ready before proceeding
    if (!router.isReady) return;

    // Handle redirect only when the session status is not "loading"
    if (status === "authenticated") {
      router.push("/digital-marketing");
    } else if (status === "unauthenticated") {
      router.push("/sign-in");
    }
  }, [router, session, status]);

  return <div></div>;
};

export default Index;
