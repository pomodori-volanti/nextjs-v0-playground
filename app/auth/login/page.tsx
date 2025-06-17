import { redirect } from "next/navigation"
import { LoginForm } from "@/components/auth/login-form"
import { auth } from "@/lib/auth"

interface LoginPageProps {
  searchParams: {
    callbackUrl?: string
    error?: string
    message?: string
  }
}

export default async function LoginPage({ searchParams }: LoginPageProps) {
  // Check if user is already logged in
  const session = await auth()

  if (session) {
    // User is already logged in, redirect to intended destination
    const redirectTo = searchParams.callbackUrl || "/dashboard"
    redirect(redirectTo)
  }

  // NextAuth error message mapping
  const getErrorMessage = (error: string) => {
    switch (error) {
      case "CredentialsSignin":
        return "Invalid email or password"
      case "Configuration":
        return "There is a problem with the server configuration"
      case "AccessDenied":
        return "Access denied"
      case "Verification":
        return "The verification token has expired or has already been used"
      case "Default":
        return "An error occurred during authentication"
      default:
        return error
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Login</h2>
          <p className="mt-2 text-sm text-gray-600">
            Or{" "}
            <a href="#" className="font-medium text-blue-600 hover:text-blue-500">
              register
            </a>
          </p>
        </div>

        <div className="bg-white p-8 rounded-lg shadow-md">
          <h3 className="text-lg font-medium mb-4">Welcome back</h3>
          <p className="text-sm text-gray-500 mb-6">Enter your credentials</p>

          {/* Show error messages */}
          {searchParams.error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-md">
              {getErrorMessage(searchParams.error)}
            </div>
          )}

          {/* Show success messages */}
          {searchParams.message && (
            <div className="mb-4 p-3 bg-green-50 border border-green-200 text-green-700 rounded-md">
              {searchParams.message}
            </div>
          )}

          <LoginForm />
        </div>
      </div>
    </div>
  )
}
