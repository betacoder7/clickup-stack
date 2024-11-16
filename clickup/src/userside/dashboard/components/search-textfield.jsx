import { useEffect, useState } from "react";

import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

export default function SearchTextfield({ onTermChange, onSearch, placeholder, className = "" }) {
    const [searchTerm, setSearchTerm] = useState("");
    const [debouncedTerm, setDebouncedTerm] = useState(searchTerm);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedTerm(searchTerm);
        }, 500);

        return () => {
            clearTimeout(handler);
        };
    }, [searchTerm]);

    useEffect(() => {
        if (debouncedTerm) {
            onSearch(debouncedTerm);
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [debouncedTerm]);

    return <div className={`flex flex-row gap-2 rounded-md border border-slate-500 transition-all duration-100 h-10 px-3 text-sm items-center w-full ${className}`}>
        <div className="h-7 w-7 aspect-square p-1">
            <MagnifyingGlassIcon />
        </div>
        <input type="text" placeholder={placeholder} className="flex-grow h-full bg-transparent"
            value={searchTerm} onChange={(e) => {
                setSearchTerm(e.target.value);
                onTermChange(e.target.value);
            }} />
    </div>;
}