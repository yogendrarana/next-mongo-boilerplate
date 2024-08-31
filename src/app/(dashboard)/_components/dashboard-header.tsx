import { AuthDropdown } from "@/components/layout/auth-dropdown"

interface DashboardHeaderProps {
    children: React.ReactNode
}

export function DashboardHeader({
    children,
}: DashboardHeaderProps) {
    return (
        <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="flex h-14 items-center px-6">
                {children}
                <div className="flex flex-1 items-center justify-end space-x-4">
                    <nav className="flex items-center space-x-2">
                        <AuthDropdown />
                    </nav>
                </div>
            </div>
        </header>
    )
}
