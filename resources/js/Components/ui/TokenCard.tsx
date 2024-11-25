import React from "react";
import {Eye, FilePenLine, RefreshCcw, Trash2} from "lucide-react";
import Dropdown from "./Dropdown";

interface TokenCardProps {
    amount: number;
    symbol: string;
    value: string;
    icon?: React.ReactNode;
}

export default function TokenCard({
    amount,
    symbol,
    value,
    icon,
}: TokenCardProps) {
    const menuItems = [
        {icon: Eye, label: "View", href: "#"},
        {icon: FilePenLine, label: "Edit", href: "#"},
        {icon: Trash2, label: "Delete", href: "#"},
    ];
    return (
        <div className="flex items-center flex-wrap gap-2 justify-between  bg-gradient-to-br  from-zinc-900 to-toColor border border-borderColor  rounded-2xl shadow-xl shadow-black/40 p-4 hover:scale-105 transition-all duration-300">
            <div className="flex items-center gap-x-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#3C3C3E] to-[#4C4C4E] flex items-center justify-center shadow-lg">
                    {icon || <RefreshCcw size={20} className="text-white" />}
                </div>
                <div>
                    <div className="flex items-center gap-x-2">
                        <span className="text-white font-medium tracking-tight">
                            {amount.toLocaleString()}
                        </span>
                        <span className="text-gray-400 font-light">
                            {symbol}
                        </span>
                    </div>
                    <span className="text-gray-400 text-sm font-light">
                        ${value}
                    </span>
                </div>
            </div>
            <div className="flex items-center space-x-2">
                <button className="px-4 py-1.5 bg-gradient-to-r from-[#3C3C3E] to-[#4C4C4E] text-white rounded-lg hover:from-[#4C4C4E] hover:to-[#5C5C5E] transition-all duration-300 font-medium text-sm ">
                    Withdraw
                </button>
                <Dropdown menuItems={ menuItems} />
            </div>
        </div>
    );
}
