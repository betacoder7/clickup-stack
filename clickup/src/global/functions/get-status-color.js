export function getStatusBackgroundColor(status) {
    switch (status) {
        case "TO DO": return "bg-transparent";
        case "PAUSE": return "bg-transparent";
        case "IN PROGRESS": return "bg-progress";
        case "REVIEW": return "bg-review";
        case "DONE": return "bg-done";
        default: return "bg-transparent";
    }
}