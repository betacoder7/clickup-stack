import TodoIcon from "../../assets/SVGs/todo.svg";
import PausedIcon from "../../assets/SVGs/paused.svg";
import ProgressIcon from "../../assets/SVGs/progress.svg";
import ReviewIcon from "../../assets/SVGs/review.svg";
import CompleteIcon from "../../assets/SVGs/complete.svg";

const statuses = [
    {
        name: "TO DO",
        icon: TodoIcon,
    },
    {
        name: "PAUSE",
        icon: PausedIcon,
    },
    {
        name: "IN PROGRESS",
        icon: ProgressIcon,
    },
    {
        name: "REVIEW",
        icon: ReviewIcon,
    },
    {
        name: "DONE",
        icon: CompleteIcon,
    },
];

export default statuses;