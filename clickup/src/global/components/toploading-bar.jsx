import React from "react";
import { useSelector } from "react-redux";
import LoadingBar from "react-top-loading-bar";

export default function ToploadingBar() {
    const topLoadingBarSlice = useSelector(state => state.topLoadingBarSlice);

    return <LoadingBar color="#109CF1"
        height={2}
        progress={topLoadingBarSlice.progress} />;
};