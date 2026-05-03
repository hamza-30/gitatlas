import React from 'react'
import { FaRegUser } from "react-icons/fa";

function UsernameInput({title, username, setUsername}) {
  return (
    <div className={`w-full h-fit relative `}>
        <p className={`text-xs text-gray-700 mb-1 font-semibold`}>{title}</p>
        <input className={`w-full border border-gray-200 h-10 outline-none pl-9 focus:ring focus:ring-[#3a3a3a] transition-discrete ease-in-out duration-150 bg-[whitesmoke] text-[0.93rem]`} type="text" 
        value={username}
        onChange={(e) => setUsername(e.target.value)}/>
        <FaRegUser className={`absolute left-2.5 bottom-3`}/>
    </div>
  )
}

export default UsernameInput