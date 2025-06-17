import { SidebarTrigger } from "@/components/ui/sidebar"

export default function DocumentsPage() {
  return (
    <div className="p-6">
      <div className="flex items-center gap-2 mb-6">
        <SidebarTrigger />
        <h1 className="text-2xl font-bold">Documents</h1>
      </div>
      <p>View your documents here.</p>
    </div>
  )
}
