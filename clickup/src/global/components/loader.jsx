export default function Loader() {
    return <div style={{ display: "none" }} className="fixed top-[50%] left-[50%] mx-auto transform -translate-x-1/2 -translate-y-1/2 z-[5]" id="loader">
        <l-tail-chase
            size="60"
            speed="1.75"
            color={document.documentElement.classList.contains("dark") ? "#109CF1" : "#0A35BD"}
        />
    </div>;
};