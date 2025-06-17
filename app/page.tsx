import Link from "next/link"

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
      <div className="max-w-md w-full space-y-8 text-center">
        <h1 className="text-4xl font-bold">Welcome to My App</h1>
        <p className="text-lg text-gray-600">Please sign in to continue</p>

        <div className="flex flex-col space-y-4">
          <Link
            href="/auth/login"
            className="py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Sign In
          </Link>

          <Link
            href="/auth/login?redirect=/dashboard"
            className="py-2 px-4 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
          >
            Sign In (redirect to dashboard)
          </Link>

          <Link
            href="/auth/login?redirect=/settings"
            className="py-2 px-4 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
          >
            Sign In (redirect to settings)
          </Link>
        </div>
      </div>
    </div>
  )
}
