import { Link, useForm } from "@inertiajs/react";
import { LogOut, Settings, User } from "lucide-react";
import { useState } from "react";
import { Menu, MenuItem } from "./Menu";

interface User {
    id: number;
    name: string;
    email: string;
    // Add other user properties you need
}
function Avatar({ currentUser }: { currentUser: User | null }) {
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const { post } = useForm();

    const handleLogout = (e: { preventDefault: () => void }) => {
        e.preventDefault();
        post(route("logout"));
    };
    return (
        <div className="relative bg-primary ">
            <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center gap-x-4 w-full p-2 bg-gradient-to-br  from-zinc-900 to-toColor border border-borderColor  rounded-full shadow-xl shadow-black/40  transition-colors duration-200"
            >
                <img
                    src={`https://ui-avatars.com/api/?name=${currentUser?.name}`}
                    alt="Profile"
                    className="w-8 h-8 rounded-full"
                />
            </button>

            {isProfileOpen && (
                <>
                    <div
                        className="fixed inset-0 z-10"
                        onClick={() => setIsProfileOpen(false)}
                    />
                    <div className="absolute right-0 mt-2   bg-gradient-to-br  from-zinc-800 to-toColor border border-borderColor  rounded-2xl shadow-xl shadow-black/90  py-2 z-20 min-w-[200px]">
                        <div className="flex flex-col flex-1 text-left gap-0 px-4 py-2 border-b border-borderColor pb-3 mb-2">
                            <h3 className="text-white font-medium m-0">
                                {currentUser?.name}
                            </h3>
                            <span className="text-gray-400 text-sm">
                                {currentUser?.email}
                            </span>
                        </div>

                        <Menu>
                            <MenuItem
                                href="/profile"
                                icon={<User size={20} />}
                                active={false}
                            >
                                Profile
                            </MenuItem>

                            <form
                                onSubmit={handleLogout}
                                className={`flex items-center  text-gray-400 space-x-3 w-full px-4 py-2 border-r-0 rounded-xl shadow-black/80 border border-transparent  hover:bg-gradient-to-r hover:from-zinc-800 hover:to-toColor hover:!border-borderColor shadow-2xl hover:!text-white"}`}
                            >
                                <LogOut size={20} />
                                <button type="submit">Logout</button>
                            </form>
                        </Menu>
                    </div>
                </>
            )}
        </div>
    );
}

export default Avatar;
