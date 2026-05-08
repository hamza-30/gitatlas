import React, { useEffect, useState } from "react";
import UsernameInput from "../components/UsernameInput";
import { MdCompareArrows } from "react-icons/md";
import ProfileCard from "../components/ProfileCard";
import { IoStatsChartOutline } from "react-icons/io5";
import {
  calculateLanguageUsageData,
  calculateStats,
} from "../utils/githubUtils";
import { LuChartPie } from "react-icons/lu";
import LanguagePieChart from "../components/LanguagePieChart";
import { GoFileDirectory } from "react-icons/go";
import RepoCard from "../components/RepoCard";
import { convertToUpdatedAgoTime } from "../utils/githubUtils";

function decideWinner(val1, val2) {
  if (val1 > val2) {
    return "left";
  } else if (val2 > val1) {
    return "right";
  } else {
    return "tie";
  }
}

function Compare() {
  const [user1, setUser1] = useState("");
  const [user2, setUser2] = useState("");
  const [user1Profile, setUser1Profile] = useState(null);
  const [user2Profile, setUser2Profile] = useState(null);
  const [user1RepoData, setUser1RepoData] = useState([]);
  const [user2RepoData, setUser2RepoData] = useState([]);
  const [fetchError, setFetchError] = useState(false);
  const [loading, setLoading] = useState(false);

  const githubLanguages = {
    JavaScript: "JS",
    TypeScript: "TS",
    Python: "PY",
    Java: "JAVA",
    "C++": "CPP",
    C: "C",
    "C#": "CS",
    PHP: "PHP",
    Ruby: "RB",
    Go: "GO",
    Rust: "RS",
    Swift: "SWIFT",
    Kotlin: "KT",
    Dart: "DART",
    Scala: "SCALA",
    Perl: "PL",
    R: "R",
    MATLAB: "M",
    Shell: "SH",
    Bash: "BASH",
    PowerShell: "PS1",
    Lua: "LUA",
    Haskell: "HS",
    Elixir: "EX",
    Erlang: "ERL",
    Clojure: "CLJ",
    FSharp: "FS",
    OCaml: "ML",
    Julia: "JL",
    Groovy: "GROOVY",
    ObjectiveC: "M",
    VisualBasic: "VB",
    Assembly: "ASM",
    SQL: "SQL",
    HTML: "HTML",
    CSS: "CSS",
    SCSS: "SCSS",
    Less: "LESS",
    XML: "XML",
    YAML: "YML",
    JSON: "JSON",
    Markdown: "MD",
    Dockerfile: "DOCKERFILE",
    Makefile: "MAKEFILE",
    Vue: "VUE",
    Svelte: "SVELTE",
    Solidity: "SOL",
    Zig: "ZIG",
    Nim: "NIM",
    Crystal: "CR",
    Fortran: "F90",
    COBOL: "COB",
    Ada: "ADB",
    Prolog: "PL",
    Lisp: "LISP",
  };

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

  function onCompareClick() {
    if (user1 && user2) {
      async function getUsersProfile() {
        try {
          setFetchError(false);
          setUser1Profile(null);
          setUser2Profile(null);

          const [
            user1ProfileResult,
            user2ProfileResult,
            user1RepoResult,
            user2RepoResult,
          ] = await Promise.all([
            fetch(`https://api.github.com/users/${user1}`),
            fetch(`https://api.github.com/users/${user2}`),
            fetch(
              `https://api.github.com/users/${user1}/repos?per_page=100&sort=updated`,
            ),
            fetch(
              `https://api.github.com/users/${user2}/repos?per_page=100&sort=updated`,
            ),
          ]);

          if (!user1ProfileResult.ok || !user2ProfileResult.ok) {
            throw new Error("Failed to fetch users data.");
          }

          let user1ProfileData = await user1ProfileResult.json();
          let user2ProfileData = await user2ProfileResult.json();
          let user1RepoData = await user1RepoResult.json();
          let user2RepoData = await user2RepoResult.json();

          setUser1Profile(user1ProfileData);
          setUser2Profile(user2ProfileData);
          setUser1RepoData(user1RepoData);
          setUser2RepoData(user2RepoData);
        } catch (error) {
          setFetchError(true);
          console.log(error);
        }
      }

      getUsersProfile();
    }
  }

  const {
    totalStars: user1TotalStars,
    totalForks: user1TotalForks,
    rawStarsCount: user1RawStarsCount,
    rawForksCount: user1RawForksCount,
  } = calculateStats(user1RepoData);
  const {
    totalStars: user2TotalStars,
    totalForks: user2TotalForks,
    rawStarsCount: user2RawStarsCount,
    rawForksCount: user2RawForksCount,
  } = calculateStats(user2RepoData);

  const user1Followers =
    user1Profile?.followers > 1000
      ? `${(user1Profile.followers / 1000).toFixed(1)}K`
      : (user1Profile?.followers ?? 0);
  const user2Followers =
    user2Profile?.followers > 1000
      ? `${(user2Profile.followers / 1000).toFixed(1)}K`
      : (user2Profile?.followers ?? 0);

  const {
    languageUsagePieData: user1LanguagePieData,
    languageUsagePercentage: user1LanguagePercentage,
  } = calculateLanguageUsageData(user1RepoData);
  const {
    languageUsagePieData: user2LanguagePieData,
    languageUsagePercentage: user2LanguagePercentage,
  } = calculateLanguageUsageData(user2RepoData);

  const user1LanguageCount = user1LanguagePercentage.length;
  const user2LanguageCount = user2LanguagePercentage.length;

  const starsWinner = decideWinner(user1RawStarsCount, user2RawStarsCount);
  const forksWinner = decideWinner(user1RawForksCount, user2RawForksCount);
  const repoCountWinner = decideWinner(
    user1RepoData.length,
    user2RepoData.length,
  );
  const languageCountWinner = decideWinner(
    user1LanguageCount,
    user2LanguageCount,
  );
  const followersWinner = decideWinner(
    user1Profile?.followers,
    user2Profile?.followers,
  );

  const user1TopRepos = user1RepoData
    .sort((a, b) => b.stargazers_count - a.stargazers_count)
    .slice(0, 4);
  const user2TopRepos = user2RepoData
    .sort((a, b) => b.stargazers_count - a.stargazers_count)
    .slice(0, 4);

  return (
    <div
      className={`w-full min-h-[calc(100vh-100px)] px-4 md:px-9 lg:px-20 flex flex-col items-center justify-center`}
    >
      <div
        className={`w-full md:w-160 lg:w-176
        ${user1Profile != null || user2Profile != null ? "pt-25" : "pt-0"}`}
      >
        <h1 className={`text-[1.27rem] sm:text-[1.5rem] text-center mb-6`}>
          Compare profiles of two Github users.
        </h1>

        <div
          className={`bg-white rounded-xl p-5 border border-gray-200 flex flex-col items-center gap-y-5 mb-8`}
        >
          <div
            className={`w-full flex flex-col md:flex-row gap-y-1 md:gap-x-4 items-center`}
          >
            <UsernameInput
              title={"USER 1"}
              username={user1}
              setUsername={setUser1}
            />
            <div
              className={`py-2 px-2.5 bg-black text-white rounded-lg mt-4.5`}
            >
              VS
            </div>
            <UsernameInput
              title={"USER 2"}
              username={user2}
              setUsername={setUser2}
            />
          </div>

          <button
            className={`bg-black text-white w-fit px-4 py-1.5 flex items-center justify-center gap-x-1 active:scale-95 transition-transform ease-out duration-150 rounded-sm`}
            onClick={onCompareClick}
          >
            <MdCompareArrows className={`text-[1.3rem]`} />
            <p className={`text-[0.88rem]`}>Compare</p>
          </button>
        </div>
      </div>

      {/* Profile Cards */}
      <div
        className={`w-full h-fit flex flex-col md:flex-row gap-y-2.5 gap-x-2`}
      >
        {user1Profile && (
          <ProfileCard
            imgSource={user1Profile.avatar_url}
            name={user1Profile.name}
            username={user1Profile.login}
            followers={user1Profile.followers}
            following={user1Profile.following}
            joinedDate={user1Profile.created_at}
            location={user1Profile.location}
            office={user1Profile.company}
          />
        )}
        <div className={`self-stretch w-1 bg-gray-200`}></div>
        {user2Profile && (
          <ProfileCard
            imgSource={user2Profile.avatar_url}
            name={user2Profile.name}
            username={user2Profile.login}
            followers={user2Profile.followers}
            following={user2Profile.following}
            joinedDate={user2Profile.created_at}
            location={user2Profile.location}
            office={user2Profile.company}
          />
        )}
      </div>
      {/* Profile Cards */}

      {/* Profile Metrics */}
      {user1RepoData.length > 0 && user2RepoData.length > 0 && (
        <div
          className={`w-full h-fit bg-white mt-8 border border-gray-200 rounded-sm`}
        >
          <div
            className={`px-7 py-2 flex items-center gap-x-2 bg-black text-white rounded-t-sm`}
          >
            <IoStatsChartOutline className={`text-lg`} />
            <p className={`text-xs mt-1 font-semibold`}>PROFILE METRICS</p>
          </div>
          <table className={`w-full overflow-x-scroll`}>
            <thead className={`h-8 bg-gray-50 text-sm text-gray-600`}>
              <tr>
                <th className={`w-1/3 font-medium`}>@{user1Profile?.login}</th>
                <th className={`w-1/3 font-medium`}>METRIC</th>
                <th className={`w-1/3 font-medium`}>@{user2Profile?.login}</th>
              </tr>
            </thead>
            <tbody>
              <tr
                className={`border-b border-gray-200 h-12 text-gray-700 hover:bg-gray-50`}
              >
                <td
                  className={`w-1/3 font-medium text-center text-lg text-black`}
                >
                  {starsWinner == "left" && "🏆"}{" "}
                  <span
                    className={`${starsWinner == "left" ? "text-green-600" : "text-black"}`}
                  >
                    {user1TotalStars}
                  </span>
                </td>
                <td className={`w-1/3 font-medium text-center text-xs`}>
                  TOTAL STARS
                </td>
                <td
                  className={`w-1/3 font-medium text-center text-lg text-black`}
                >
                  {starsWinner == "right" && "🏆"}{" "}
                  <span
                    className={`${starsWinner == "right" ? "text-green-600" : "text-black"}`}
                  >
                    {user2TotalStars}
                  </span>
                </td>
              </tr>
              <tr
                className={`border-b border-gray-200 h-12 text-gray-700 hover:bg-gray-50`}
              >
                <td
                  className={`w-1/3 font-medium text-center text-lg text-black`}
                >
                  {forksWinner == "left" && "🏆"}{" "}
                  <span
                    className={`${forksWinner == "left" ? "text-green-600" : "text-black"}`}
                  >
                    {user1TotalForks}
                  </span>
                </td>
                <td className={`w-1/3 font-medium text-center text-xs`}>
                  TOTAL FORKS
                </td>
                <td
                  className={`w-1/3 font-medium text-center text-lg text-black`}
                >
                  {forksWinner == "right" && "🏆"}{" "}
                  <span
                    className={`${forksWinner == "right" ? "text-green-600" : "text-black"}`}
                  >
                    {user2TotalForks}
                  </span>
                </td>
              </tr>
              <tr
                className={`border-b border-gray-200 h-12 text-gray-700 hover:bg-gray-50`}
              >
                <td
                  className={`w-1/3 font-medium text-center text-lg text-black`}
                >
                  {repoCountWinner == "left" && "🏆"}{" "}
                  <span
                    className={`${repoCountWinner == "left" ? "text-green-600" : "text-black"}`}
                  >
                    {user1RepoData.length}
                  </span>
                </td>
                <td className={`w-1/3 font-medium text-center text-xs`}>
                  PUBLIC REPOS
                </td>
                <td
                  className={`w-1/3 font-medium text-center text-lg text-black`}
                >
                  {repoCountWinner == "right" && "🏆"}{" "}
                  <span
                    className={`${repoCountWinner == "right" ? "text-green-600" : "text-black"}`}
                  >
                    {user2RepoData.length}
                  </span>
                </td>
              </tr>
              <tr
                className={`border-b border-gray-200 h-12 text-gray-700 hover:bg-gray-50`}
              >
                <td
                  className={`w-1/3 font-medium text-center text-lg text-black`}
                >
                  {languageCountWinner == "left" && "🏆"}{" "}
                  <span
                    className={`${languageCountWinner == "left" ? "text-green-600" : "text-black"}`}
                  >
                    {user1LanguageCount}
                  </span>
                </td>
                <td className={`w-1/3 font-medium text-center text-xs`}>
                  LANGUAGES
                </td>
                <td
                  className={`w-1/3 font-medium text-center text-lg text-black`}
                >
                  {languageCountWinner == "right" && "🏆"}{" "}
                  <span
                    className={`${languageCountWinner == "right" ? "text-green-600" : "text-black"}`}
                  >
                    {user2LanguageCount}
                  </span>
                </td>
              </tr>
              <tr className={` h-12 text-gray-700 hover:bg-gray-50`}>
                <td
                  className={`w-1/3 font-medium text-center text-lg text-black`}
                >
                  {followersWinner == "left" && "🏆"}{" "}
                  <span
                    className={`${followersWinner == "left" ? "text-green-600" : "text-black"}`}
                  >
                    {user1Followers}
                  </span>
                </td>
                <td className={`w-1/3 font-medium text-center text-xs`}>
                  FOLLOWERS
                </td>
                <td
                  className={`w-1/3 font-medium text-center text-lg text-black`}
                >
                  {followersWinner == "right" && "🏆"}{" "}
                  <span
                    className={`${followersWinner == "right" ? "text-green-600" : "text-black"}`}
                  >
                    {user2Followers}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
      {/* Profile Metrics */}

      {/* Language Breakdown */}
      {(user1LanguagePieData.length > 0 || user2LanguagePieData.length > 0) && (
        <div
          className={`w-full h-fit bg-white mt-8 border border-gray-200 rounded-sm`}
        >
          <div
            className={`px-7 py-2 flex items-center gap-x-2 bg-black text-white rounded-t-sm`}
          >
            <LuChartPie className={`text-lg`} />
            <p className={`text-xs mt-1 font-semibold`}>LANGUAGE BREAKDOWN</p>
          </div>

          <div className={`flex flex-col lg:flex-row gap-x-3`}>
            <LanguagePieChart
              languageUsagePieData={user1LanguagePieData}
              languageUsagePercentage={user1LanguagePercentage}
              isFlexRowReverse={false}
            />
            <LanguagePieChart
              languageUsagePieData={user2LanguagePieData}
              languageUsagePercentage={user2LanguagePercentage}
              isFlexRowReverse={true}
            />
          </div>
        </div>
      )}
      {/* Language Breakdown */}

      {/* Top Repositories */}
      <div
        className={`w-full h-fit mt-8 flex flex-col md:flex-row gap-x-6 gap-y-5 mb-10`}
      >
        {user1RepoData.length > 0 && (
          <div
            className={`w-full h-fit bg-white border border-gray-200 rounded-sm`}
          >
            <div
              className={`px-7 py-2 flex items-center justify-between bg-black text-white rounded-t-sm`}
            >
              <div className={`flex items-center gap-x-2`}>
                <GoFileDirectory className={`text-lg`} />
                <p className={`text-xs mt-1 font-semibold`}>TOP REPOSITORIES</p>
              </div>
              <div className={`text-xs`}>@{user1}</div>
            </div>

            <div className={`w-full flex flex-wrap gap-0`}>
              {user1RepoData.length > 0 &&
                user1TopRepos.map((repo, index) => (
                  <RepoCard
                    key={index}
                    repoName={repo.name}
                    description={repo.description}
                    language={repo.language}
                    languageColor={languageColors[repo.language]}
                    starsCount={repo.stargazers_count}
                    forksCount={repo.forks_count}
                    updatedTime={convertToUpdatedAgoTime(repo.updated_at)}
                    username={user1}
                    isCompareComponent={true}
                  />
                ))}
            </div>
          </div>
        )}

        {user2RepoData.length > 0 && (
          <div
            className={`w-full h-fit bg-white border border-gray-200 rounded-sm`}
          >
            <div
              className={`px-7 py-2 flex items-center justify-between bg-black text-white rounded-t-sm flex-row-reverse`}
            >
              <div className={`flex items-center gap-x-2`}>
                <GoFileDirectory className={`text-lg`} />
                <p className={`text-xs mt-1 font-semibold`}>TOP REPOSITORIES</p>
              </div>
              <div className={`text-xs`}>@{user2}</div>
            </div>

            <div className={`w-full flex flex-wrap gap-0`}>
              {user2RepoData.length > 0 &&
                user2TopRepos.map((repo, index) => (
                  <RepoCard
                    key={index}
                    repoName={repo.name}
                    description={repo.description}
                    language={repo.language}
                    languageColor={languageColors[repo.language]}
                    starsCount={repo.stargazers_count}
                    forksCount={repo.forks_count}
                    updatedTime={convertToUpdatedAgoTime(repo.updated_at)}
                    username={user2}
                    isCompareComponent={true}
                    isFlexRowReverse={true}
                  />
                ))}
            </div>
          </div>
        )}
      </div>
      {/* Top Repositories */}
    </div>
  );
}

export default Compare;
