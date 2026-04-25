import React from 'react'
import { FaExternalLinkAlt } from "react-icons/fa";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { HiOutlineOfficeBuilding } from "react-icons/hi";
import { IoMdCalendar } from "react-icons/io";
import { MdOutlinePeopleAlt } from "react-icons/md";
import { MdOutlinePersonAdd } from "react-icons/md";
import StatsCard from '../components/StatsCard';
import { IoMdStarOutline } from "react-icons/io";
import { PiGitFork } from "react-icons/pi";
import { VscRepo } from "react-icons/vsc";
import { IoIosCode } from "react-icons/io";

function Analyzer() {
  return (
    <div className={`flex flex-col items-center px-4 md:px-9 lg:px-20 gap-y-9`}>

      {/* Profile Overview */}
      <div className={`bg-white w-full min-h-fit mt-8 border border-gray-100 rounded-sm py-4 px-4`}>
        <div className={`w-full flex flex-col md:flex-row gap-x-8 flex-wrap`}>
          <div className={`h-35 w-35 border border-gray-200 rounded-full mb-4 md:mb-0`}>
            {/* image here */}
          </div>

          <div className={`flex-1 flex flex-col`}>
            <div className={`flex justify-between`}>
              <div className={`mb-3`}>
                <h2 className={`text-[1.5rem] font-medium`}>Linus Torvalds</h2>
                <span className={`text-gray-500 text-sm`}>@torvalds</span>
              </div>

              <button className={`flex items-center gap-x-1 bg-[#252525] hover:bg-[#252525c7] h-fit px-3 py-1 text-white rounded-sm mt-[4.5px]`}>
                <FaExternalLinkAlt className={`text-xs`}/>
                <a href={``} className={`text-[0.8rem]`}>View on GitHub</a>
              </button>
            </div>

            <div className={`text-[#313131] border-b border-gray-300 pb-4`}>
              Senior Full-Stack Engineer focused on developer tools and performance. Building scalable systems and writing about engineering patterns. Core contributor to several open-source frameworks.
            </div>

            <div className={`flex pt-3 gap-x-3.5 flex-wrap gap-y-2`}>
              <span className={`flex items-center gap-x-0.5`}>
                <HiOutlineLocationMarker className={`text-lg`}/>
                <p className={`text-[0.8rem] text-gray-700`}>San Francisco, CA</p>
              </span>

              <span className={`flex items-center gap-x-0.5`}>
                <HiOutlineOfficeBuilding className={`text-base`}/>
                <p className={`text-[0.8rem] text-gray-700`}>Acme Corp</p>
              </span>

              <span className={`flex items-center gap-x-0.5`}>
                <IoMdCalendar className={`text-lg`}/>
                <p className={`text-[0.8rem] text-gray-700`}>Joined Sep, 2018</p>
              </span>

              <span className={`flex items-center gap-x-0.5`}>
                <MdOutlinePeopleAlt className={`text-lg`}/>
                <p className={`text-[0.8rem] text-gray-700`}> <span className={`font-semibold`}>1.2k</span> Followers</p>
              </span>

              <span className={`flex items-center gap-x-0.5`}>
                <MdOutlinePersonAdd className={`text-lg`}/>
                <p className={`text-[0.8rem] text-gray-700`}> <span className={`font-semibold`}>145</span> Following</p>
              </span>

            </div>
          </div>
        </div>
      </div> 
      {/* Profile Overview */}

      {/* Stats Cards */}
      <div className={`w-full min-h-fit flex flex-col md:flex-row gap-y-3 md:gap-x-4`}>
        <StatsCard title={`TOTAL STARS`} icon={IoMdStarOutline} data={8432}/>
        <StatsCard title={`FORKS`} icon={PiGitFork} data={1204}/> 
        <StatsCard title={`REPOSITORIES`} icon={VscRepo} data={64}/>
        <StatsCard title={`LANGUAGES`} icon={IoIosCode} data={12}/>
      </div>
      {/* Stats Cards */}
    </div>
  )
}

export default Analyzer