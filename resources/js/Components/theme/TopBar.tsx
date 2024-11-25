import { Menu, X } from "lucide-react";
import SearchInput from "@/Components/ui/SearchInput";
import Avatar from "@/Components/ui/Avatar";
import Title from "@/Components/ui/Title";
import NotifyBell from "@/Components/ui/NotifyBell";

interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at?: string;
    created_at?: string;
    updated_at?: string;
}
interface TopBarProps {
    isMobileOpen: boolean;
    title:string,
    setIsMobileOpen: (open: boolean) => void;
    user: User | null;
}
function TopBar({
    isMobileOpen,
    setIsMobileOpen,
    title,
    user,
    ...props
}: TopBarProps) {
    return (
        <div className=" flex gap-2 sm:flex-row lg:gap-4 justify-between items-center mb-4 lg:mb-6 border-b border-borderColor pb-4 lg:pb-6">
            <Title>{title}</Title>
            <div className="flex justify-between md:justify-end items-center gap-x-2 md:gap-x-4 ">
                <SearchInput />
                <NotifyBell />

                <Avatar currentUser={user} />
                <button
                    onClick={() => setIsMobileOpen(!isMobileOpen)}
                    className="z-50 lg:hidden bg-gradient-to-br  from-zinc-700 to-zinc-900 to-50% border border-borderColor rounded-xl  shadow-xl shadow-black/40 p-2 text-white"
                >
                    {isMobileOpen ? <X /> : <Menu />}
                </button>
            </div>
        </div>
    );
}

export default TopBar;
