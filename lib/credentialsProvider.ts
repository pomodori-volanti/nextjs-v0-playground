import CredentialsProvider from "next-auth/providers/credentials"

// Mock user database (replace with real database)
const MOCK_USERS = [
  {
    id: "1",
    email: "admin@example.com",
    password: "password123", // In real app, this would be hashed
    name: "Admin User",
    role: "admin",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
  },
  {
    id: "2",
    email: "user@example.com",
    password: "password123",
    name: "Regular User",
    role: "user",
    image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face",
  },
  {
    id: "3",
    email: "demo@example.com",
    password: "demo123",
    name: "Demo User",
    role: "user",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
  },
]

// Helper function to verify credentials (replace with real database query)
async function verifyCredentials(email: string, password: string) {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  const user = MOCK_USERS.find((u) => u.email === email && u.password === password)

  if (user) {
    return {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      image: user.image,
    }
  }

  return null
}

export const credentialsProvider = CredentialsProvider({
  name: "credentials",
  credentials: {
    email: { type: "email" },
    password: { type: "password" },
  },
  async authorize(credentials) {
    if (!credentials?.email || !credentials?.password) {
      throw new Error("Email and password are required")
    }

    try {
      const user = await verifyCredentials(credentials.email, credentials.password)

      if (user) {
        console.log(`✅ User ${user.email} authenticated successfully`)
        return user
      } else {
        console.log(`❌ Authentication failed for ${credentials.email}`)
        throw new Error("Invalid email or password")
      }
    } catch (error) {
      console.error("Authentication error:", error)
      throw new Error("Authentication failed")
    }
  },
})
