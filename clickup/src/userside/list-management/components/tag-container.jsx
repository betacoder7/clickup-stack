import { TagIcon, XMarkIcon } from "@heroicons/react/24/outline";

export default function TagContainer({ tag, canEdit = false, onRemove }) {
    return <div data-edit={canEdit} style={{ backgroundColor: tag.backgroundColor, color: tag.textColor }} className="relative group px-2 flex gap-1 items-center justify-center h-6 rounded-md w-max text-xs cursor-pointer">
        <div className="h-4 w-4 aspect-square">
            <TagIcon />
        </div>
        <p>{tag.name}</p>

        <div style={{ backgroundColor: tag.backgroundColor }} className="hidden group-data-[edit=true]:group-hover:flex absolute right-1">
            <div onClick={() => onRemove(tag)} className="h-4 w-4 aspect-square opacity-60 transition-all duration-100 ease-in-out hover:opacity-100">
                <XMarkIcon />
            </div>
        </div>
    </div>;
}
