import { MainNav } from "@/components/layout/main-nav";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex min-h-screen flex-col lg:flex-row">
            <MainNav />
            <main className="flex-1 pb-24 lg:pl-72 lg:pb-0">
                {children}
            </main>
        </div>
    );
}
