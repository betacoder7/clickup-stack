import React from "react";

const PageNotFound = () => {
    return <div className="flex flex-auto items-center justify-center text-center px-4 flex-col sm:flex-row h-full">
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight sm:pr-6 sm:mr-6 sm:border-r sm:border-slate-600 text-slate-700">404</h1>
        <h2 className="mt-2 text-lg text-slate-700 sm:mt-0">This page could not be found.</h2>
    </div>;
};

export default PageNotFound;