import React, { useState } from "react";
import {
    LayoutDashboard,
    Settings,
    HelpCircle,
    Brush,
    Users,
    UserPlus,
    LucideIcon,
    ClipboardList,
    LayoutList,
    ListCollapse, FileText,
} from "lucide-react";

import { Menu, MenuItem, SubMenu } from "@/Components/ui/Menu";
import Logo from "@/Components/ui/Logo";
import { usePage } from "@inertiajs/react";

interface MenuItemType {
    icon: LucideIcon;
    text: string;
    active: boolean;
    hasSubmenu?: boolean;
    badge?: string;
}

interface SubmenuItemType {
    icon: LucideIcon;
    text: string;
}

interface SidebarProps {
    isMobileOpen: boolean;
    setIsMobileOpen: (isOpen: boolean) => void;
}

const bottomItems: MenuItemType[] = [
    { icon: Settings, text: "Settings", active: false },
    { icon: Brush, text: "Appearance", active: false },
    { icon: HelpCircle, text: "Support", active: false },
];

export default function Sidebar({ isMobileOpen }: SidebarProps): JSX.Element {
    const { url, component } = usePage()
    return (
        <div
            className={`lg:w-64 z-30 fixed lg:static w-64 h-screen bg-primary p-4 flex flex-col gap-8 border-r border-borderColor transition-transform duration-300
        ${isMobileOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0
      `}
        >
            <Logo />
            <div className="flex flex-col gap-6">
                <div className="relative">
                    <p className="text-white/40 text-sm px-4 mb-2">
                        MENU
                    </p>
                    <div className="flex flex-col gap-1">
                        <Menu>
                            <MenuItem
                                href="/"
                                icon={<LayoutDashboard size={20} />}
                                active={url == '/'}
                            >
                                Dashboard
                            </MenuItem>
                            <MenuItem
                                href="/tasks"
                                icon={<LayoutList size={20} />}
                                active={url == '/tasks'}
                            >
                                Tasks
                            </MenuItem>
                            <MenuItem
                                href="/clients"
                                icon={<Users size={20} />}
                                active={url == '/clients'}
                            >
                                Clients
                            </MenuItem>
                            <MenuItem
                                href="/invoices"
                                icon={<FileText size={20} />}
                                active={url == '/invoices'}
                            >
                                Invoices
                            </MenuItem>

                            <MenuItem href="#" icon={<Settings size={20} />}>
                                Settings
                            </MenuItem>
                        </Menu>
                    </div>
                </div>
            </div>

            <div className="mt-auto space-y-1">
                {bottomItems.map((item, index) => {
                    const ItemIcon = item.icon;
                    return (
                        <button
                            key={index}
                            className={`flex items-center shadow-none text-gray-400 space-x-3 w-full px-4 py-2 border-r-0 rounded-xl shadow-black/40 border border-transparent ${
                                item.active
                                    ? "bg-gradient-to-r from-zinc-800 to-toColor border !border-borderColor shadow-2xl !text-white"
                                    : "hover:bg-gradient-to-r hover:from-zinc-800 hover:to-toColor border hover:!border-borderColor shadow-2xl hover:!text-white"
                            }`}
                        >
                            <ItemIcon size={20} />
                            <span>{item.text}</span>
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
