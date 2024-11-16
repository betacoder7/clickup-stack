import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import BackIcon from "../../assets/SVGs/back-icon.svg";

export default function DropDown({ items, onChange, active, label, className, ...props }) {
    active = active === "" ? null : active;

    return <Menu as="div" {...props} className={`relative text-left w-40 bg-slate-500 flex items-center px-5 rounded-primary ${className}`}>
        <div className="w-full">
            <MenuButton className="group w-full inline-flex justify-between text-sm font-medium text-slate-200 hover:text-white">
                {active ?? label}
                <img className="primary-icon rotate-[270deg] object-contain" src={BackIcon} alt="bottom-arrow" />
            </MenuButton>
        </div>

        <MenuItems
            transition
            className="absolute right-0 z-10 mt-2 top-9 w-40 origin-top-right rounded-md bg-slate-500 shadow-2xl ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
        >
            <div className="py-1">
                {items.map((option) => (
                    <MenuItem key={option}>
                        <button
                            type="button"
                            onClick={() => onChange(option)}
                            className={(active === option ? 'font-medium text-white' : 'text-slate-300') +
                                ' block px-4 py-2 text-sm data-[focus]:bg-slate-400 w-full text-start'}
                        >
                            {option}
                        </button>
                    </MenuItem>
                ))}
            </div>
        </MenuItems>
    </Menu>;
}