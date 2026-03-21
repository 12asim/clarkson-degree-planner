import { SignUp } from '@clerk/nextjs'

export default function SignUpPage() {
  return (
    <div className="flex justify-center items-center min-h-[80vh] px-4 w-full">
      <SignUp />
    </div>
  )
}
