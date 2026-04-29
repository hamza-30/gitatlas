import React from 'react'
import { IoMdStarOutline } from "react-icons/io";
import { PiGitFork } from "react-icons/pi";

function RepoCard({repoName, description, language, languageColor = "#ccc", starsCount, forksCount, username}) {
    let starCount = 0
    let forkCount = 0

    starCount = starsCount >= 1000 ? (starsCount / 1000).toFixed(1) + "k" : starsCount
    forkCount = forksCount >= 1000 ? (forksCount / 1000).toFixed(1) + "k" : forksCount

  return (
    <a href={`https://www.github.com/${username}/${repoName}`} className={`rounded-sm border border-gray-200 w-full lg:w-[48%] grow h-40 px-3 py-3 cursor-pointer relative group hover:bg-gray-100 transition-all ease-in-out duration-150`}>
        <div className={`flex justify-between items-center`}>
            <div className={`font-semibold group-hover:underline`}>{repoName}</div>
            <div className={`text-xs bg-gray-200 px-2 py-0.5 rounded-sm text-gray-700`}>Public</div>
        </div>

        <p className={`mt-3 h-10 overflow-hidden line-clamp-3 text-sm text-gray-600`}>
            {description}
        </p>

        <div className={`absolute flex items-center gap-x-4 bottom-3 text-gray-700`}>
            <div className={`flex items-center gap-x-1.5`}>
                <div className={`h-[0.88rem] w-[0.88rem] rounded-sm mb-0.5`}
                style={{backgroundColor: languageColor}}></div>
                <div className={`text-sm`}>{language}</div>
            </div>

            <div className={`flex gap-x-1`}>
                <IoMdStarOutline className={`text`}/>
                <div className={`text-sm`}>{starCount}</div>
            </div>

            <div className={`flex gap-x-1`}>
                <PiGitFork className={`text`}/>
                <div className={`text-sm`}>{forkCount}</div>
            </div>
        </div>
    </a>
  )
}

export default RepoCard