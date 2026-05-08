import React from "react";
import { PiFolderOpen } from "react-icons/pi";
import { ResponsiveContainer, Tooltip, PieChart, Pie, Cell } from "recharts";
import LanguageInfo from "./LanguageInfo";

function LanguagePieChart({
  languageUsagePieData,
  languageUsagePercentage,
  isFlexRowReverse = "false",
}) {
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

  return (
    <div
      className={`flex flex-1 flex-col h-[15rem] px-4 pt-7 pb-4 bg-white gap-x-2 gap-y-6 items-center
        ${isFlexRowReverse ? "lg:flex-row-reverse" : "lg:flex-row"}`}
    >
      {languageUsagePieData.length > 0 && (
        <div
          className={`flex justify-center w-full lg:w-[40%] h-[9rem] lg:h-[14rem]`}
        >
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
      )}
      {languageUsagePercentage.length > 0 && (
        <div
          className={`max-h-32 overflow-y-auto flex flex-col gap-y-3 w-full flex-1`}
        >
          {languageUsagePercentage.map((lang, index) => (
            <LanguageInfo
              key={index}
              language={lang.language}
              percentage={lang.percentage}
              color={languageColors[lang.language]}
            />
          ))}
        </div>
      )}

      <div
        className={`flex-1 flex flex-col gap-y-1 justify-center items-center text-[#737373] mb-6
              ${languageUsagePieData.length == 0 ? "block" : "hidden"}`}
      >
        <PiFolderOpen className={`text-[2.5rem]`} />
        <p className={`text-sm`}>No language found</p>
      </div>
    </div>
  );
}

export default LanguagePieChart;
