import { redirect } from "next/navigation"
import { cookies } from "next/headers"

export default async function OnboardingPage() {
  const cookieStore = await cookies()
  const onboardingComplete = cookieStore.get("onboarding-complete")

  // Redirect if onboarding is already complete
  if (onboardingComplete?.value === "true") {
    redirect("/dashboard")
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Welcome! Let's get you set up.</h1>
      {/* Onboarding form here */}
    </div>
  )
}
