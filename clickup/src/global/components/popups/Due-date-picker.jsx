export default function dueDate() {
    return <div className="flex flex-col w-full">
        <div className="relative block bg-slate-600 border rounded-lg overflow-hidden">
            <div className="relative flex items-center gap-2 border-b h-12 p-2 contain-content">
                <input type="date" className="bg-slate-600 focus:border border-b-indigo-400" />
                Due date
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero veritatis quas nihil veniam sint, exercitationem officiis error quam natus iste eos eius officia corporis rem autem eum excepturi et incidunt?
            </div>
            <div></div>
        </div>
        {/* <PopUp
            popoverButton={<div className="rounded-md h-7 border border-gray-100 border-opacity-40 px-2 flex items-center justify-center cursor-pointer gap-1">
                <CalendarIcon className="aspect-square h-3 w-3 object-contain" />
                <p className="text-xs text-gray-100">Start - end date</p>
            </div>} child={
                <div className=" flex flex-row">
                    <div>
                        <SingleDatePicker
                            value={formik.values.Start}
                            onChange={(val) => formik.setFieldValue("dueDate", val)}
                        />
                    </div>
                    <div>
                        <SingleDatePicker
                            value={formik.values.E}
                            onChange={(val) => formik.setFieldValue("dueDate", val)}
                        />
                    </div>

                </div>
            }
        /> */}

        {/* <PopUp className="bg-gray-700 left-0 w-[350px] rounded-primary flex flex-col p-5 relative"
            popoverButton={<div className="rounded-md h-7 border border-gray-100 border-opacity-40 px-2 flex items-center justify-center cursor-pointer gap-1">
                <CalendarIcon className="aspect-square h-3 w-3 object-contain" />
                <p className="text-xs text-gray-100">Due date</p>
            </div>} child={<div className="flex ">
                <div className="flex flex-col justify-between w-[350px]  h-[378px] z-20 absolute right-[349px] top-0  rounded-primary bg-gray-700">
                    <div className="block pt-3 pb-2 px-2   right-40 overflow-hidden">
                        <button className="w-full flex gap-x-2 items-center justify-between py-2 px-4 ">
                            <div className="font-normal text-sm whitespace-nowrap ">today</div>
                            <div className="whitespace-nowrap "> mon</div>
                        </button>
                        <button className="w-full flex gap-x-2 items-center justify-between py-2 px-4">
                            <div className="font-normal text-sm whitespace-nowrap ">today</div>
                            <div className="whitespace-nowrap "> mon</div>
                        </button>
                        <button className="w-full flex gap-x-2 items-center justify-between py-2 px-4 ">
                            <div className="font-normal text-sm whitespace-nowrap ">today</div>
                            <div className="whitespace-nowrap "> mon</div>
                        </button>
                        <button className="w-full flex gap-x-2 items-center justify-between py-2 px-4 ">
                            <div className="font-normal text-sm whitespace-nowrap ">today</div>
                            <div className="whitespace-nowrap "> mon</div>
                        </button>
                        <button className="w-full flex gap-x-2 items-center justify-between py-2 px-4 ">
                            <div className="font-normal text-sm whitespace-nowrap ">today</div>
                            <div className="whitespace-nowrap "> mon</div>
                        </button>
                        <button className="w-full flex gap-x-2 items-center justify-between py-2 px-4 ">
                            <div className="font-normal text-sm whitespace-nowrap ">today</div>
                            <div className="whitespace-nowrap "> mon</div>
                        </button>
                        <button className="w-full flex gap-x-2 items-center justify-between py-2 px-4 ">
                            <div className="font-normal text-sm whitespace-nowrap ">today</div>
                            <div className="whitespace-nowrap "> mon</div>
                        </button>
                    </div>
                </div>
                <div className="">
                    <SingleDatePicker
                        value={formik.values.dueDate}
                        onChange={(val) => formik.setFieldValue("dueDate", val)}
                    />
                </div>
            </div>
            }
        /> */}
    </div>;




}