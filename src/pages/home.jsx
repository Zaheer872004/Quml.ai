import { useSession, signIn, signOut } from "next-auth/react"

export default function Component() {
  const { data: session } = useSession()

  return (
    <div>
      <h1>Welcome to the Quml.ai</h1>
      {session ? (
        <p>
          Logged in as {session.user.name}. <Link href="/digital-marketing">Go to Dashboard</Link>
        </p>
      ) : (
        <p>
          <Link href="/sign-in">Sign In</Link> or <Link href="/sign-up">Sign Up</Link>
        </p>
      )}
    </div>
  );














//   if(session) {
//     return <>
//       Signed in as {session.user.email} <br/>
//       <button onClick={() => signOut()}>Sign out</button>
//     </>
//   }
//   return <>
//     Not signed in <br/>

//     // here our custom sign in OR login 

//     <button onClick={() => signIn()}>Sign in</button>
//   </>
}