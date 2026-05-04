import React from "react";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { HiOutlineOfficeBuilding } from "react-icons/hi";
import { IoMdCalendar } from "react-icons/io";
import { MdOutlinePeopleAlt } from "react-icons/md";
import { MdOutlinePersonAdd } from "react-icons/md";

function ProfileCard({
  imgSource,
  name,
  username,
  followers = 0,
  following = 0,
  joinedDate,
  location,
  office,
}) {
  return (
    <div
      className={`bg-white w-full min-h-fit border border-gray-200 rounded-sm p-5`}
    >
      <div className={`w-full flex gap-x-8`}>
        <div
          className={`h-20 w-20 border border-gray-200 rounded-lg mb-4 md:mb-0 overflow-clip`}
        >
          <img src={imgSource} alt="profile photo" className={`h-fit w-fit`} />
        </div>

        <div className={`flex flex-col`}>
          <h2 className={`text-[1.5rem] font-medium`}>{name}kkk</h2>
          <span className={`text-gray-500 text-sm`}>@{username}sdfsd</span>
        </div>
      </div>

      <div className={`flex gap-x-13 mt-7 pb-2 border-b border-b-gray-200`}>
        <div className={`flex flex-col`}>
          <p className={`text-sm`}>Followers</p>
          <span className={`font-semibold text-[17px]`}>{followers}</span>
        </div>
        <div className={`flex flex-col`}>
          <p className={`text-sm`}>Following</p>
          <span className={`font-semibold text-[17px]`}>{following}</span>
        </div>
      </div>

      <div className={`flex pt-3 gap-x-3.5 flex-wrap gap-y-2`}>
        {joinedDate && (
          <span className={`flex items-center gap-x-0.5`}>
            <IoMdCalendar className={`text-lg mb-0.5`} />
            <p className={`text-[0.8rem] text-gray-700`}>{joinedDate}</p>
          </span>
        )}

        {location && (
          <span className={`flex items-center gap-x-0.5 mb-0.5`}>
            <HiOutlineLocationMarker className={`text-lg`} />
            <p className={`text-[0.8rem] text-gray-700`}>{location}</p>
          </span>
        )}

        {office && (
          <span className={`flex items-center gap-x-0.5 mb-0.5`}>
            <HiOutlineOfficeBuilding className={`text-base`} />
            <p className={`text-[0.8rem] text-gray-700`}>{office}</p>
          </span>
        )}
      </div>
    </div>
  );
}

export default ProfileCard;
