import { Search } from "lucide-react";
import { useState, ChangeEvent } from "react";

interface SearchInputProps {
  onSearch?: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export default function SearchInput({
  onSearch,
  placeholder = "Search",
  className = "",
}: SearchInputProps) {
  const [searchValue, setSearchValue] = useState<string>("");

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const newValue = event.target.value;
    setSearchValue(newValue);
    onSearch?.(newValue);
  };

  return (
    <div className={`relative xl:block hidden ${className}`}>
      <Search
        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
        size={20}
      />
      <input
        type="text"
        value={searchValue}
        onChange={handleSearchChange}
        placeholder={placeholder}
        className="bg-primary bg-gradient-to-br from-fromColor to-toColor border border-borderColor shadow-xl shadow-black/40 text-white pl-10 pr-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
}
