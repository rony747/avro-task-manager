import React, { useState, useEffect, useRef } from "react";
import { MoreVertical } from "lucide-react";
import { Link } from "@inertiajs/react";
import { createPortal } from "react-dom";

interface IconProps {
    size?: number | string;
}

type IconComponent = React.ComponentType<IconProps>;

interface MenuItem {
    icon: IconComponent;
    label: string;
    href: string;
}

export default function Dropdown({ menuItems }: { menuItems: MenuItem[] }) {
    const [isOpen, setIsOpen] = useState(false);
    const [showMenu, setShowMenu] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const [position, setPosition] = useState({ top: 0, left: 0 });

    const calculatePosition = () => {
        if (dropdownRef.current) {
            const rect = dropdownRef.current.getBoundingClientRect();
            setPosition({
                top: rect.bottom + window.scrollY,
                left: rect.right - 192 // w-48 = 192px
            });
        }
    };

    const handleOpen = () => {
        calculatePosition();
        setIsOpen(true);
        setTimeout(() => setShowMenu(true), 10);
    };

    const handleClose = () => {
        setShowMenu(false);
        setTimeout(() => setIsOpen(false), 150); // Match transition duration
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                handleClose();
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
            window.addEventListener('scroll', calculatePosition);
            window.addEventListener('resize', calculatePosition);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            window.removeEventListener('scroll', calculatePosition);
            window.removeEventListener('resize', calculatePosition);
        };
    }, [isOpen]);

    return (
        <div ref={dropdownRef} className="relative">
            <button
                onClick={() => isOpen ? handleClose() : handleOpen()}
                className="p-2 hover:bg-[#3C3C3E] rounded-lg transition-colors duration-200"
            >
                <MoreVertical size={20} className="text-gray-400" />
            </button>

            {isOpen && createPortal(
                <div
                    className={`fixed shadow-lg py-1 bg-[#2C2C2E] rounded-xl w-48 transform transition-all duration-150 ease-out ${
                        showMenu ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'
                    }`}
                    style={{
                        top: `${position.top}px`,
                        left: `${position.left}px`,
                        zIndex: 9999
                    }}
                >
                    {menuItems.map((item, index) => (
                        <Link
                            href={item.href}
                            key={index}
                            className="flex items-center space-x-2 w-full px-4 py-2 text-sm text-gray-200 hover:bg-[#3C3C3E] transition-colors duration-200"
                        >
                            <item.icon size={16} />
                            <span>{item.label}</span>
                        </Link>
                    ))}
                </div>,
                document.body
            )}
        </div>
    );
}