import React from "react";
import gitAtlasLogo from "/src/assets/images/gitatlas-logo.png";

function Navbar() {
  return (
    <div className={`w-full h-13 bg-white px-4`}>
      <div className={`h-full w-fit flex items-center`}>
        <img className={`h-5 w-auto`} src={gitAtlasLogo} alt="logo" />
      </div>
    </div>
  );
}

export default Navbar;
