import React, { use, useState } from "react";
import { FaExternalLinkAlt } from "react-icons/fa";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { HiOutlineOfficeBuilding } from "react-icons/hi";
import { IoMdCalendar } from "react-icons/io";
import { MdOutlinePeopleAlt } from "react-icons/md";
import { MdOutlinePersonAdd } from "react-icons/md";
import StatsCard from "../components/StatsCard";
import { IoMdStarOutline } from "react-icons/io";
import { PiGitFork } from "react-icons/pi";
import { VscRepo } from "react-icons/vsc";
import { IoIosCode } from "react-icons/io";
import LanguageInfo from "../components/LanguageInfo";
import { MdFilterList } from "react-icons/md";
import { IoIosSearch } from "react-icons/io";
import { BiSort } from "react-icons/bi";
import { RxCross2 } from "react-icons/rx";
import RepoCard from "../components/RepoCard";

function Analyzer() {
  const [languageFilter, setLanguageFilter] = useState("");
  const [isFilterDropdown, setIsFilterDropdown] = useState(false);
  const [sortRepo, setSortRepo] = useState("");
  const [isSortRepoDropdown, setIsSortRepoDropdown] = useState(false);
  const [searchRepo, setSearchRepo] = useState("")

  const languageColors = {
    JavaScript: "#f1e05a",
    TypeScript: "#3178c6",
    Python: "#3572A5",
    Java: "#b07219",
    C: "#555555",
    "C++": "#f34b7d",
    "C#": "#178600",
    Go: "#00ADD8",

    Rust: "#dea584",
    Ruby: "#701516",
    PHP: "#4F5D95",
    Swift: "#ffac45",
    Kotlin: "#A97BFF",
    Dart: "#00B4AB",

    HTML: "#e34c26",
    CSS: "#563d7c",
    SCSS: "#c6538c",

    Shell: "#89e051",
    Dockerfile: "#384d54",
  };

  const githubLanguages = [
    "Python",
    "JavaScript",
    "TypeScript",
    "Java",
    "C++",
    "C#",
    "Go",
    "Rust",
    "PHP",
    "Ruby",
    "Swift",
    "Kotlin",
    "Dart",
    "Shell",
    "PowerShell",
    "R",
    "MATLAB",
    "Haskell",
    "Elixir",
    "Scala",
  ];

  const sortList = ["Most stars", "Most forks", "Recently updated"];

  return (
    <div className={`flex flex-col items-center px-4 md:px-9 lg:px-20 gap-y-9`}>
      {/* Profile Overview */}
      <div
        className={`bg-white w-full min-h-fit mt-8 border border-gray-100 rounded-sm py-4 px-4`}
      >
        <div className={`w-full flex flex-col md:flex-row gap-x-8 flex-wrap`}>
          <div
            className={`h-35 w-35 border border-gray-200 rounded-full mb-4 md:mb-0`}
          >
            {/* image here */}
          </div>

          <div className={`flex-1 flex flex-col`}>
            <div className={`flex justify-between flex-row flex-wrap`}>
              <div className={`mb-3`}>
                <h2 className={`text-[1.5rem] font-medium`}>Linus Torvalds</h2>
                <span className={`text-gray-500 text-sm`}>@torvalds</span>
              </div>

              <button
                className={`mb-3 md:mb-0 max-w-33 flex items-center gap-x-1 bg-[#252525] hover:bg-[#252525c7] h-fit px-3 py-1 text-white rounded-sm mt-[4.5px]`}
              >
                <FaExternalLinkAlt className={`text-xs`} />
                <a href={``} className={`text-[0.8rem]`}>
                  View on GitHub
                </a>
              </button>
            </div>

            <div className={`text-[#313131] border-b border-gray-300 pb-4`}>
              Senior Full-Stack Engineer focused on developer tools and
              performance. Building scalable systems and writing about
              engineering patterns. Core contributor to several open-source
              frameworks.
            </div>

            <div className={`flex pt-3 gap-x-3.5 flex-wrap gap-y-2`}>
              <span className={`flex items-center gap-x-0.5`}>
                <HiOutlineLocationMarker className={`text-lg`} />
                <p className={`text-[0.8rem] text-gray-700`}>
                  San Francisco, CA
                </p>
              </span>

              <span className={`flex items-center gap-x-0.5`}>
                <HiOutlineOfficeBuilding className={`text-base`} />
                <p className={`text-[0.8rem] text-gray-700`}>Acme Corp</p>
              </span>

              <span className={`flex items-center gap-x-0.5`}>
                <IoMdCalendar className={`text-lg`} />
                <p className={`text-[0.8rem] text-gray-700`}>
                  Joined Sep, 2018
                </p>
              </span>

              <span className={`flex items-center gap-x-0.5`}>
                <MdOutlinePeopleAlt className={`text-lg`} />
                <p className={`text-[0.8rem] text-gray-700`}>
                  {" "}
                  <span className={`font-semibold`}>1.2k</span> Followers
                </p>
              </span>

              <span className={`flex items-center gap-x-0.5`}>
                <MdOutlinePersonAdd className={`text-lg`} />
                <p className={`text-[0.8rem] text-gray-700`}>
                  {" "}
                  <span className={`font-semibold`}>145</span> Following
                </p>
              </span>
            </div>
          </div>
        </div>
      </div>
      {/* Profile Overview */}

      {/* Stats Cards */}
      <div
        className={`w-full min-h-fit flex flex-col md:flex-row gap-y-3 md:gap-x-4`}
      >
        <StatsCard title={`TOTAL STARS`} icon={IoMdStarOutline} data={8432} />
        <StatsCard title={`FORKS`} icon={PiGitFork} data={1204} />
        <StatsCard title={`REPOSITORIES`} icon={VscRepo} data={64} />
        <StatsCard title={`LANGUAGES`} icon={IoIosCode} data={12} />
      </div>
      {/* Stats Cards */}

      {/* Language & Repositories */}
      <div
        className={`w-full flex flex-col rounded-sm lg:flex-row h-[27rem] mb-10 gap-y-9 md:gap-x-9`}
      >
        <div
          className={`flex flex-col h-fit lg:h-full px-4 py-4 lg:w-[30%] bg-white gap-y-6 border border-gray-100`}
        >
          <div className={`text-lg font-semibold`}>Languages</div>
          <div className={`flex justify-center`}>
            <div className={`border w-35 h-35 rounded-full`}></div>
          </div>
          <div className={`h-full lg:overflow-scroll flex flex-col gap-y-3`}>
            <LanguageInfo />
            <LanguageInfo />
            <LanguageInfo />
            <LanguageInfo />
          </div>
        </div>

        <div
          className={`h-fit lg:h-full flex-1 flex flex-col px-4 py-4 gap-y-3 bg-white border border-gray-100`}
        >
          <div className={`flex flex-col md:flex-row justify-between gap-y-3`}>
            <div className={`text-lg font-semibold`}>Top Repositories</div>
            <div
              className={`h-8 flex items-center gap-x-2 gap-y-1 relative flex-wrap md:flex-nowrap`}
            >
              <input
                type="text"
                placeholder="Find a repository..."
                value={searchRepo}
                className={`flex-1 min-w-0 outline-none text-[0.87rem] h-full border border-gray-200 pl-7 text-[#3a3a3a] focus:border-gray-600`}
                onChange={(e) => setSearchRepo(e.target.value)}
              />

              <div
                className={`h-full flex justify-center items-center px-5 border border-gray-200 gap-x-1 cursor-pointer relative
                  ${languageFilter ? "bg-black text-white" : "bg-white text-[#3a3a3a] hover:bg-gray-100 active:bg-gray-100"}`}
                onClick={() => setIsFilterDropdown(!isFilterDropdown)}
              >
                <MdFilterList
                  className={`${languageFilter ? "lg:hidden" : "block"}`}
                />
                <div className={`text-[0.87rem] hidden md:inline-block`}>
                  {languageFilter ? languageFilter : "Filter"}
                </div>

                <div
                  className={`p-0.5  rounded-xs relative left-3 text-white hover:bg-[#757474]
                ${languageFilter ? "block" : "hidden"}`}
                  onClick={(e) => {
                    e.stopPropagation()
                    setLanguageFilter("")
                    setIsFilterDropdown(false)
                  }}
                >
                  <RxCross2 />
                </div>

                <div
                  className={`h-26 w-fit bg-white top-7.5 left-0 rounded-sm border border-gray-200 overflow-y-scroll z-10
                  ${isFilterDropdown ? "absolute" : "hidden"}`}
                >
                  {githubLanguages.length !== 0 &&
                    githubLanguages.map((lang) => (
                      <div
                        key={lang}
                        className={`w-full px-[0.53rem] py-0.5 text-[0.88rem] text-black hover:bg-[#3a3a3a] hover:text-white`}
                        onClick={() => setLanguageFilter(lang)}
                      >
                        {lang}
                      </div>
                    ))}
                </div>
              </div>

              <div
                className={`relative h-full flex justify-center items-center px-5 border border-gray-200 gap-x-1 cursor-pointer
                  ${sortRepo ? "bg-black text-white" : "bg-white text-[#3a3a3a] hover:bg-gray-100 active:bg-gray-100"}`}
                onClick={() => setIsSortRepoDropdown(!isSortRepoDropdown)}
              >
                <BiSort className={`${sortRepo ? "lg:hidden" : "block"}`} />
                <div className={`text-[0.87rem] hidden md:inline-block`}>
                  {sortRepo ? sortRepo : "Sort"}
                </div>

                <div
                  className={`p-0.5 rounded-xs relative left-3 text-white hover:bg-[#757474]
                ${sortRepo ? "absolute" : "hidden"}`}
                  onClick={(e) => {
                    e.stopPropagation()
                    setSortRepo("")
                    setIsSortRepoDropdown(false)
                  }}
                >
                  <RxCross2 />
                </div>

                <div
                  className={`min-w-33 top-7.5 right-0 min-h-fit bg-white rounded-sm border border-gray-200 z-10
                  ${isSortRepoDropdown ? "absolute" : "hidden"}`}
                >
                  {sortList.map((sortBy) => (
                    <div
                      key={sortBy}
                      className={`w-full px-[0.53rem] py-0.5 text-[0.88rem] text-black hover:bg-[#3a3a3a] hover:text-white`}
                      onClick={() => setSortRepo(sortBy)}
                    >
                      {sortBy}
                    </div>
                  ))}
                </div>
              </div>
              <IoIosSearch className={`absolute left-2 text-[#3a3a3a]`} />
            </div>
          </div>

          <div
            className={`h-full flex gap-x-4 flex-wrap gap-y-4 lg:overflow-scroll`}
          >
            <RepoCard />
            <RepoCard />
            <RepoCard />
            <RepoCard />
          </div>
        </div>
      </div>
      {/* Language & Repositories */}
    </div>
  );
}

export default Analyzer;
