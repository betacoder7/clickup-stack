export default function PopoverItem({ icon, label, onClick }) {
    return <button type="button" onClick={onClick} className="h-8 flex gap-2 text-white items-center cursor-pointer hover:bg-slate-700 p-2 rounded-md transition-all duration-100 ease-in-out">
        <div className="h-4 w-4">
            {icon}
        </div>
        <h3 className="font-normal text-sm">{label}</h3>
    </button>;
}