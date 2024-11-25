import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Link } from "@inertiajs/react";

// Menu Component
interface MenuProps {
    children: React.ReactNode;
}

export const Menu: React.FC<MenuProps> = ({ children }) => {
    return <nav className="space-y-1">{children}</nav>;
};

// MenuItem Component
interface MenuItemProps {
    href: string;
    icon?: React.ReactNode;
    children: React.ReactNode;
    active?: boolean;
}

export const MenuItem: React.FC<MenuItemProps> = ({
    href,
    icon,
    children,
    active,
}) => {
    return (
        <Link
            href={href}
            className={`flex items-center shadow-none text-gray-400 space-x-3 w-full px-4 py-2 border-r-0 rounded-xl shadow-black/80 border border-transparent ${
                active
                    ? "bg-gradient-to-r from-zinc-800 to-toColor border !border-borderColor !shadow-2xl !text-white"
                    : "hover:bg-gradient-to-r hover:from-zinc-800 hover:to-toColor border hover:!border-borderColor shadow-2xl hover:!text-white"
            }`}
        >
            {icon && <span className="mr-3">{icon}</span>}
            <span className="flex-1 text-left">{children}</span>
        </Link>
    );
};

// SubMenu Component
interface SubMenuProps {
    icon?: React.ReactNode;
    title: string;
    children: React.ReactNode;
}

export const SubMenu: React.FC<SubMenuProps> = ({ icon, title, children }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="space-y-1">
            <Link
                href="#"
                onClick={(e) => {
                    e.preventDefault();
                    setIsOpen(!isOpen);
                }}
                className={`flex items-center shadow-none text-gray-400 space-x-3 w-full px-4 py-2 border-r-0 rounded-xl shadow-black/80 border border-transparent ${
                    isOpen
                        ? "bg-gradient-to-r from-zinc-800 to-toColor border !border-borderColor !shadow-2xl !text-white"
                        : "hover:bg-gradient-to-r hover:from-zinc-800 hover:to-toColor border hover:!border-borderColor shadow-2xl hover:!text-white"
                }`}
            >
                {icon && <span className="mr-3">{icon}</span>}
                <span className="flex-1 text-left">{title}</span>
                <span className="ml-2">
                    {isOpen ? (
                        <ChevronUp size={16} />
                    ) : (
                        <ChevronDown size={16} />
                    )}
                </span>
            </Link>

            {isOpen && <div className="ml-4 space-y-1">{children}</div>}
        </div>
    );
};
