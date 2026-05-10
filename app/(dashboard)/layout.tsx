import { auth } from "@/auth"
import { AppSidebar } from "@/components/ui/navigation/AppSidebar"
import { Breadcrumbs } from "@/components/ui/navigation/Breadcrumbs"
import { ForbiddenBanner } from "@/features/authorization/components/ForbiddenBanner"
import { SidebarProvider, SidebarTrigger } from "@/components/Sidebar"
import { RoleProvider } from "@/features/authorization/role-context"
import { cookies } from "next/headers"
import { Suspense } from "react"

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const cookieStore = await cookies()
  const defaultOpen = cookieStore.get("sidebar:state")?.value === "true"
  const session = await auth()

  return (
    <RoleProvider role={session?.user?.role}>
      <SidebarProvider defaultOpen={defaultOpen}>
        <AppSidebar user={session?.user} />
        <div className="flex flex-1 flex-col min-w-0">
          <header className="sticky top-0 z-10 flex h-16 shrink-0 items-center gap-2 border-b border-gray-200 bg-white px-4 dark:border-gray-800 dark:bg-gray-950">
            <SidebarTrigger className="-ml-1" />
            <div className="mr-2 h-4 w-px bg-gray-200 dark:bg-gray-800" />
            <Breadcrumbs />
          </header>
          <Suspense fallback={null}>
            <ForbiddenBanner />
          </Suspense>
          <main className="p-4 sm:p-6 lg:p-8">{children}</main>
        </div>
      </SidebarProvider>
    </RoleProvider>
  )
}
