export default function Button({ type, value, onClick, className }) {
    return <button type={type} onClick={onClick} className={`rounded-lg bg-authbutton max-h-11 px-5 text-white ${className}`}>{value}</button>;
}