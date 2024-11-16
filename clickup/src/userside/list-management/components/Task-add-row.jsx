import React, { useState } from 'react';

export const Taskaddrow = () => {

    const [showActions, setShowActions] = useState(false);
    const handleFocus = () => {
        setShowActions(true);
    };
    const handleBlur = () => {
        setShowActions(false);
    };


    return (
        <div>
            <div className="flex  items-center py-2 pl-9">
                <div className="flex items-center gap-2">
                    <button className="text-gray-400">
                        <svg
                            className="size-3 bg-gray-500 rounded-md border-none"
                            viewBox="0 0 45 45"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <circle cx="22.5" cy="22.5" r="21" stroke="#DBDBDB" strokeWidth="3" />
                        </svg>
                    </button>
                    <input
                        type="text"
                        placeholder="Task Name"
                        className="w-full text-sm text-gray-500 bg-transparent outline-none focus:ring-0"
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                    />

                    {showActions && (
                        <div className="flex items-center gap-2 ml-[430px]">
                            <button className="text-gray-400 border p-1 rounded-md border-gray-700 hover:bg-gray-600">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-3" >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                                    />
                                </svg>
                            </button>
                            <button className="text-gray-400 border p-1 rounded-md border-gray-700 hover:bg-gray-600">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-3">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5"
                                    />
                                </svg>
                            </button>
                            <button className="text-gray-400 border p-1 rounded-md border-gray-700 hover:bg-gray-600">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-3" >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M3 3v1.5M3 21v-6m0 0 2.77-.693a9 9 0 0 1 6.208.682l.108.054a9 9 0 0 0 6.086.71l3.114-.732a48.524 48.524 0 0 1-.005-10.499l-3.11.732a9 9 0 0 1-6.085-.711l-.108-.054a9 9 0 0 0-6.208-.682L3 4.5M3 15V4.5"
                                    />
                                </svg>
                            </button>
                            <button className="text-gray-400 border p-1 rounded-md border-gray-700 hover:bg-gray-600">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon" className="size-3" >
                                    <path strokeLinejoin="round" strokeLinecap="round" d="M9.568 3H5.25A2.25 2.25 0 0 0 3 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 0 0 5.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 0 0 9.568 3Z"
                                    ></path>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 6h.008v.008H6V6Z"></path>
                                </svg>
                            </button>
                            <button className="bg-gray-600 text-white px-3 py-[2px] rounded hover:bg-gray-400 focus:outline-none text-sm">
                                Cancel
                            </button>
                            <button className="bg-blue-500 text-white px-3 py-[2px] rounded hover:bg-blue-400 focus:outline-none text-sm">
                                Save
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
