export default function IconButton({ className, onClick, icon }) {
    return <button type="button" onClick={onClick} className={`hover:bg-slate-500 transition-all duration-100 ease-in-out text-white aspect-square rounded-md grid place-content-center ${className}`}>
        {icon}
    </button>;
}