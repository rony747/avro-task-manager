import React from "react";
import Dropdown from "./ui/Dropdown";

interface AssetRowProps {
  icon: React.ReactNode;
  name: string;
  symbol: string;
  price: string;
  change: string;
  volume: string;
  chart?: React.ReactNode;
}

export default function AssetRow({
  icon,
  name,
  symbol,
  price,
  change,
  volume,
  chart,
}: AssetRowProps) {
  const isPositiveChange = !change.startsWith("-");

  return (
    <div className="grid grid-cols-6 items-center py-4 border-b border-[#2C2C2E] group hover:bg-[#2C2C2E]/20 transition-colors duration-200 rounded-lg px-4">
      <div className="flex items-center space-x-3">
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#3C3C3E] to-[#4C4C4E] flex items-center justify-center shadow-lg">
          {icon}
        </div>
        <div>
          <div className="text-white font-medium tracking-tight">{name}</div>
          <div className="text-gray-400 text-sm font-light">{symbol}</div>
        </div>
      </div>
      <div className="text-white font-medium">${price}</div>
      <div
        className={`${
          isPositiveChange ? "text-green-500" : "text-red-500"
        } font-medium`}
      >
        {change}%
      </div>
      <div className="text-white font-light">{volume}M</div>
      <div className="flex-1">{chart}</div>
      <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <button className="px-4 py-1.5 bg-gradient-to-r from-[#3C3C3E] to-[#4C4C4E] text-white rounded-lg hover:from-[#4C4C4E] hover:to-[#5C5C5E] transition-all duration-300 font-medium text-sm">
          Trade
        </button>
        <Dropdown menuItems={[]} />
      </div>
    </div>
  );
}
