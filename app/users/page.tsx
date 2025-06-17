import Link from "next/link"
import { getUserProfileUrl } from "@/lib/navigation"

export default function UsersPage() {
  // Lista de usuarios de ejemplo
  const users = [
    { id: "123", name: "John Doe" },
    { id: "456", name: "Jane Smith" },
  ]

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Usuarios</h1>
      <ul className="space-y-2">
        {users.map((user) => (
          <li key={user.id} className="p-3 border rounded-md">
            <Link href={getUserProfileUrl(user.id)} className="text-blue-600 hover:underline">
              {user.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
