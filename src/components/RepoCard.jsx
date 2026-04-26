import React from 'react'
import { IoMdStarOutline } from "react-icons/io";
import { PiGitFork } from "react-icons/pi";

function RepoCard() {
  return (
    <a href={`#`} className={`rounded-sm border border-gray-200 w-full lg:w-[48%] grow h-40 px-3 py-3 cursor-pointer relative group hover:bg-gray-100 transition-all ease-in-out duration-150`}>
        <div className={`flex justify-between items-center`}>
            <div className={`font-semibold group-hover:underline`}>react-query-builder</div>
            <div className={`text-xs bg-gray-200 px-2 py-0.5 rounded-sm text-gray-700`}>Public</div>
        </div>

        <p className={`mt-3 h-10 overflow-hidden line-clamp-3 text-sm text-gray-600`}>
            A powerful, flexible visual query builder for React applications. Supports complex logical grouping.
        </p>

        <div className={`absolute flex items-center gap-x-4 bottom-3 text-gray-700`}>
            <div className={`flex items-center gap-x-1.5`}>
                <div className={`h-[0.88rem] w-[0.88rem] bg-amber-300 rounded-sm mb-0.5`}></div>
                <div className={`text-sm`}>JavaScript</div>
            </div>

            <div className={`flex gap-x-1`}>
                <IoMdStarOutline className={`text`}/>
                <div className={`text-sm`}>3.2k</div>
            </div>

            <div className={`flex gap-x-1`}>
                <PiGitFork className={`text`}/>
                <div className={`text-sm`}>450</div>
            </div>
        </div>
    </a>
  )
}

export default RepoCard