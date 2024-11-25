import { useState } from "react";
import Sidebar from "@/Components/theme/Sidebar";
import TopBar from "@/Components/theme/TopBar";
import { usePage } from "@inertiajs/react";
import {Toaster} from "@/Components/ui/toaster";

function PageLayout({ children,...props }: { children: React.ReactNode,title?: string }) {
    const [isMobileOpen, setIsMobileOpen] = useState(false);
    const currentUser = usePage().props.auth.user;

    return (
        <div className="flex min-h-screen bg-primary text-white">
            {
                <Sidebar
                    isMobileOpen={isMobileOpen}
                    setIsMobileOpen={setIsMobileOpen}
                />
            }

            <main className="flex-1 lg:p-8 lg:py-6 p-4 overflow-auto h-screen overflow-x-hidden text-white">
                <TopBar
                    isMobileOpen={isMobileOpen}
                    setIsMobileOpen={setIsMobileOpen}
                    user={currentUser}
                    title={props.title? props.title: `Welcome ${currentUser?.name}`}
                    {...props}
                />
                {children}
                <Toaster />
            </main>
        </div>
    );
}

export default PageLayout;
