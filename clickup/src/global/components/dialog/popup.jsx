import { Popover, PopoverTrigger, PopoverContent } from "@nextui-org/popover";

export default function PopUp({ popoverButton, className, child, popOverButtonClassName, placement = "bottom-start" }) {
    return <Popover className={popOverButtonClassName} placement={placement}>
        <PopoverTrigger>
            {popoverButton}
        </PopoverTrigger>

        <PopoverContent className={`shadow-gray-900 border-slate-600 border shadow-xl ${className}`}>
            {child}
        </PopoverContent>
    </Popover>;
}