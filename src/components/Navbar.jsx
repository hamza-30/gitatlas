import React from "react";
import gitAtlasLogo from "/src/assets/images/gitatlas-logo.png";
import { useLocation, matchPath, Link } from "react-router";
import { FaArrowRightLong } from "react-icons/fa6";

function Navbar() {
  let location = useLocation()
  let isHomePage = matchPath("/", location.pathname)
  let isAnalyzerPage = matchPath("/analyzer/:username", location.pathname)
  let isComparePage = matchPath("/compare", location.pathname)

  return (
    <div className={`w-full h-13 bg-white px-4 flex items-center justify-between`}>
      <Link to={"/"} className={`h-full w-fit flex items-center`}>
        <img className={`h-4.5 w-auto`} src={gitAtlasLogo} alt="logo" />
      </Link>

      {(isAnalyzerPage || isHomePage) && 
        <Link to={"/compare"} className={`bg-[#252525] text-white text-[0.85rem] px-4 py-2 rounded-xl active:scale-95 transition-transform ease-in-out duration-100`}>
          Compare
        </Link>
      }

      {isComparePage &&
        <Link to={"/"} className={`bg-[#252525] text-white text-[0.85rem] px-4 py-2 rounded-xl active:scale-95 transition-transform ease-in-out duration-100 flex items-center gap-x-2 group`}>
          Return
          <FaArrowRightLong className={`group-hover:translate-x-2 group-active:translate-x-2 transition-transform ease-in-out duration-200`}/>
        </Link>
      }
    </div>
  );
}

export default Navbar;
