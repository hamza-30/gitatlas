import React, { useEffect, useState } from "react";
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
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
} from "recharts";
import RepoCard from "../components/RepoCard";
import ContributionStatsCard from "../components/ContributionStatsCard";
import { useParams } from "react-router";
import { div } from "framer-motion/client";

function convertToUpdatedAgoTime(date) {
  let today = new Date();
  let repoDate = new Date(date);

  let diffInSeconds = Math.floor((today - repoDate) / 1000);

  const years = Math.floor(diffInSeconds / 31536000);
  if (years >= 1) {
    return years > 1 ? `${years} years ago` : `${years} year ago`;
  }

  const months = Math.floor(diffInSeconds / 2592000);
  if (months >= 1) {
    return months > 1 ? `${months} months ago` : `${months} month ago`;
  }

  const weeks = Math.floor(diffInSeconds / 604800);
  if (weeks >= 1) {
    return weeks > 1 ? `${weeks} weeks ago` : `${weeks} week ago`;
  }

  const days = Math.floor(diffInSeconds / 86400);
  if (days >= 1) {
    return days > 1 ? `${days} days ago` : `${days} day ago`;
  }

  const hours = Math.floor(diffInSeconds / 3600);
  if (hours >= 1) {
    return hours > 1 ? `${hours} hours ago` : `${hours} hour ago`;
  }

  const minutes = Math.floor(diffInSeconds / 60);
  if (minutes >= 1) {
    return minutes > 1 ? `${minutes} minutes ago` : `${minutes} minute ago`;
  }

  return `just now`;
}

function Analyzer() {
  const [languageFilter, setLanguageFilter] = useState("");
  const [isFilterDropdown, setIsFilterDropdown] = useState(false);
  const [sortRepo, setSortRepo] = useState("");
  const [isSortRepoDropdown, setIsSortRepoDropdown] = useState(false);
  const [searchRepo, setSearchRepo] = useState("");
  const { username } = useParams();
  const [profileData, setProfileData] = useState(null);
  const [repoData, setRepoData] = useState([]);

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

  const contributionData = [
    { month: "May", contributions: 15 },
    { month: "Jun", contributions: 22 },
    { month: "Jul", contributions: 18 },
    { month: "Aug", contributions: 30 },
    { month: "Sep", contributions: 25 },
    { month: "Oct", contributions: 40 },
    { month: "Nov", contributions: 35 },
    { month: "Dec", contributions: 20 },
    { month: "Jan", contributions: 28 },
    { month: "Feb", contributions: 32 },
    { month: "Mar", contributions: 45 },
    { month: "Apr", contributions: 50 },
  ];

  useEffect(() => {
    async function getUserProfile() {
      try {
        let [profileResult, repoResult] = await Promise.all([
          fetch(`https://api.github.com/users/${username}`),
          fetch(
            `https://api.github.com/users/${username}/repos?per_page=100&sort=updated`,
          ),
        ]);

        let profileData = await profileResult.json();
        let repoData = await repoResult.json();

        setProfileData(profileData);
        setRepoData(repoData);
      } catch (error) {
        console.log("Error fetching data");
      }
    }

    getUserProfile();
  }, [username]);

  if (!profileData) {
    return <div>Loading...</div>;
  }

  let joinedDate = "";
  if (profileData) {
    joinedDate = new Date(profileData.created_at).toDateString().split(" ");
    joinedDate =
      joinedDate.slice(1, 3).join(" ") + ", " + joinedDate.slice(3).join(" ");
  }

  let totalStars = repoData
    .reduce((acc, repo) => acc + repo.stargazers_count, 0)
    .toLocaleString();
  let totalForks = repoData
    .reduce((acc, repo) => acc + repo.forks_count, 0)
    .toLocaleString();
  let totalLanguages = new Set(
    repoData.map((repo) => repo.language).filter(Boolean),
  ).size;

  let languageUsageFrequency = {};
  for (const repo of repoData) {
    if (repo.language) {
      languageUsageFrequency[repo.language] =
        (languageUsageFrequency[repo.language] || 0) + 1;
    }
  }

  let languageUsagePieData = [
    ...Object.entries(languageUsageFrequency).map((lang) => ({
      name: lang[0],
      value: lang[1],
    })),
  ];

  let reposWithLanguage = repoData.filter((repo) => repo.language)

  let languageUsagePercentage = languageUsagePieData.map((lang) => ({
    language: lang.name,
    percentage: ((lang.value / reposWithLanguage.length) * 100).toFixed(1),
  })).sort((a , b) => b.percentage - a.percentage)

  let filteredRepoData = repoData.filter((repo) => {
    let filteredByLanguage = repo.language == languageFilter || !languageFilter;
    let searchedByName =
      repo.name.toLowerCase().includes(searchRepo.toLowerCase()) || !searchRepo;

    return filteredByLanguage && searchedByName;
  });

  if (sortRepo == "Most stars") {
    filteredRepoData = filteredRepoData.sort(
      (a, b) => b.stargazers_count - a.stargazers_count,
    );
  } else if (sortRepo == "Most forks") {
    filteredRepoData = filteredRepoData.sort(
      (a, b) => b.forks_count - a.forks_count,
    );
  } else if (sortRepo == "Recently updated") {
    filteredRepoData = filteredRepoData.sort(
      (a, b) => new Date(b.updated_at) - new Date(a.updated_at),
    );
  }

  return (
    <div className={`flex flex-col items-center px-4 md:px-9 lg:px-20 gap-y-9`}>
      {/* Profile Overview */}
      <div
        className={`bg-white w-full min-h-fit mt-8 border border-gray-100 rounded-sm py-4 px-4`}
      >
        <div className={`w-full flex flex-col md:flex-row gap-x-8 flex-wrap`}>
          <div
            className={`h-35 w-35 border border-gray-200 rounded-full mb-4 md:mb-0 overflow-clip`}
          >
            <img
              src={profileData.avatar_url}
              alt="profile photo"
              className={`h-fit w-fit`}
            />
          </div>

          <div className={`flex-1 flex flex-col`}>
            <div className={`flex justify-between flex-row flex-wrap`}>
              <div className={`mb-3`}>
                <h2 className={`text-[1.5rem] font-medium`}>
                  {profileData.name}
                </h2>
                <span className={`text-gray-500 text-sm`}>
                  @{profileData.login}
                </span>
              </div>

              <button
                className={`mb-3 md:mb-0 max-w-33 flex items-center gap-x-1 bg-[#252525] hover:bg-[#252525c7] h-fit px-3 py-1 text-white rounded-sm mt-[4.5px]`}
              >
                <FaExternalLinkAlt className={`text-xs`} />
                <a
                  href={`https://www.github.com/${username}`}
                  className={`text-[0.8rem]`}
                >
                  View on GitHub
                </a>
              </button>
            </div>

            <div
              className={`text-[#313131] border-b border-gray-300
              ${profileData.bio ? "pb-4" : "pb-0"}`}
            >
              {profileData.bio}
            </div>

            <div className={`flex pt-3 gap-x-3.5 flex-wrap gap-y-2`}>
              {profileData.location && (
                <span className={`flex items-center gap-x-0.5`}>
                  <HiOutlineLocationMarker className={`text-lg`} />
                  <p className={`text-[0.8rem] text-gray-700`}>
                    {profileData.location}
                  </p>
                </span>
              )}

              {profileData.company && (
                <span className={`flex items-center gap-x-0.5`}>
                  <HiOutlineOfficeBuilding className={`text-base`} />
                  <p className={`text-[0.8rem] text-gray-700`}>
                    {profileData.company}
                  </p>
                </span>
              )}

              {profileData.created_at && (
                <span className={`flex items-center gap-x-0.5`}>
                  <IoMdCalendar className={`text-lg`} />
                  <p className={`text-[0.8rem] text-gray-700`}>{joinedDate}</p>
                </span>
              )}

              {profileData.followers && (
                <span className={`flex items-center gap-x-0.5`}>
                  <MdOutlinePeopleAlt className={`text-lg`} />
                  <p className={`text-[0.8rem] text-gray-700`}>
                    <span className={`font-semibold`}>
                      {profileData.followers.toLocaleString()}
                    </span>{" "}
                    Followers
                  </p>
                </span>
              )}

              {profileData.following >= 0 && (
                <span className={`flex items-center gap-x-0.5`}>
                  <MdOutlinePersonAdd className={`text-lg`} />
                  <p className={`text-[0.8rem] text-gray-700`}>
                    {" "}
                    <span className={`font-semibold`}>
                      {profileData.following.toLocaleString()}
                    </span>{" "}
                    Following
                  </p>
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* Profile Overview */}

      {/* Stats Cards */}
      <div
        className={`w-full min-h-fit flex flex-col md:flex-row gap-y-3 md:gap-x-4`}
      >
        <StatsCard
          title={`TOTAL STARS`}
          icon={IoMdStarOutline}
          data={totalStars}
        />
        <StatsCard title={`FORKS`} icon={PiGitFork} data={totalForks} />
        <StatsCard
          title={`REPOSITORIES`}
          icon={VscRepo}
          data={repoData.length}
        />
        <StatsCard title={`LANGUAGES`} icon={IoIosCode} data={totalLanguages} />
      </div>
      {/* Stats Cards */}

      {/* Language & Repositories */}
      <div
        className={`w-full flex flex-col rounded-sm lg:flex-row lg:h-[27rem] gap-y-9 md:gap-x-9`}
      >
        <div
          className={`flex flex-col max-h-fit lg:h-full px-4 py-4 lg:w-[30%] bg-white gap-y-6 border border-gray-100`}
        >
          <div className={`text-lg font-semibold`}>Languages</div>
          <div className={`flex justify-center w-full h-[9rem] lg:h-[19rem]`}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={languageUsagePieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50} // This creates the "donut" hole
                  outerRadius={70} // This determines the total size
                  paddingAngle={3} // Adds a tiny gap between slices for a modern look
                  dataKey="value"
                  stroke="none" // Removes the default border around slices
                >
                  {languageUsagePieData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={languageColors[entry.name] || "#ccc"}
                    />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    fontSize: "14px",
                    borderRadius: "8px",
                    border: "none",
                    boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className={`h-full lg:overflow-scroll flex flex-col gap-y-3`}>
            {languageUsagePercentage.map((lang, index) => (
              <LanguageInfo
                key={index}
                language={lang.language}
                percentage={lang.percentage}
                color={languageColors[lang.language]}
              />
            ))}
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
                    e.stopPropagation();
                    setLanguageFilter("");
                    setIsFilterDropdown(false);
                  }}
                >
                  <RxCross2 />
                </div>

                <div
                  className={`h-fit max-h-26 w-fit bg-white top-7.5 left-0 rounded-sm border border-gray-200 overflow-y-scroll z-10
                  ${isFilterDropdown ? "absolute" : "hidden"}`}
                >
                  {languageUsagePercentage.map((lang, index) => (
                    <div
                      key={index}
                      className={`w-full px-[0.53rem] py-0.5 text-[0.88rem] text-black hover:bg-[#3a3a3a] hover:text-white`}
                      onClick={() => setLanguageFilter(lang.language)}
                    >
                      {lang.language}
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
                    e.stopPropagation();
                    setSortRepo("");
                    setIsSortRepoDropdown(false);
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
            {filteredRepoData.length > 0 ? (
              filteredRepoData.map((repo, index) => (
                <RepoCard
                  key={index}
                  repoName={repo.name}
                  description={repo.description}
                  language={repo.language}
                  languageColor={languageColors[repo.language]}
                  starsCount={repo.stargazers_count}
                  forksCount={repo.forks_count}
                  updatedTime={convertToUpdatedAgoTime(repo.updated_at)}
                  username={username}
                />
              ))
            ) : (
              <div>No repo found, try refining search</div>
            )}
          </div>
        </div>
      </div>
      {/* Language & Repositories */}

      {/* Contribution Activity */}
      <div
        className={`min-h-fit w-full flex flex-col gap-y-4 mb-10 px-4 py-4 rounded-sm bg-white border border-gray-100`}
      >
        <div className={`text-lg font-semibold`}>Contribution Activity</div>

        <div className={`h-60`}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={contributionData}>
              {/* Hiding the axis lines/ticks for a cleaner, modern UI */}
              <XAxis
                dataKey="month"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#6B7280", fontSize: 12 }}
                dy={10}
              />
              <YAxis hide={true} />
              <Tooltip
                cursor={{ fill: "#F3F4F6" }}
                contentStyle={{
                  borderRadius: "8px",
                  border: "none",
                  boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                }}
              />
              <Bar
                dataKey="contributions"
                fill="#2da54e"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className={`flex flex-wrap gap-x-5 gap-y-3`}>
          <ContributionStatsCard title={"MOST ACTIVE DAY"} data={"Wednesday"} />
          <ContributionStatsCard title={"MOST ACTIVE MONTH"} data={"June"} />
          <ContributionStatsCard title={"CURRENT STREAK"} data={"14 days"} />
          <ContributionStatsCard
            title={"TOTAL CONTRIBUTIONS"}
            data={"1842 (last year)"}
          />
        </div>
      </div>
      {/* Contribution Activity */}
    </div>
  );
}

export default Analyzer;
