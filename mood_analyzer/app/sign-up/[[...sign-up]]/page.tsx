import { SignUp } from '@clerk/nextjs'

export default function Page() {
  return <SignUp forceRedirectUrl={"/new-user"}/>
}