import React from "react";
import { FiArrowUpRight } from "react-icons/fi";
import { useNavigate } from "react-router";

function RecentSearch({ username }) {
  const navigate = useNavigate();

  return (
    <div
      className={`py-2 px-4 hover:bg-gray-200 active:bg-gray-200 text-gray-700 flex items-center gap-x-2 cursor-pointer`}
      onClick={() => navigate(`/analyzer/${username}`)}
    >
      <FiArrowUpRight className={`text-xl`} />
      <p className={`text-sm`}>@{username}</p>
    </div>
  );
}

export default RecentSearch;
