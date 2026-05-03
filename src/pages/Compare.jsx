import React, { useState } from 'react'
import UsernameInput from '../components/UsernameInput'
import { MdCompareArrows } from "react-icons/md";

function Compare() {
  const [user1, setUser1] = useState("")
  const [user2, setUser2] = useState("")

  return (
    <div className={`w-full min-h-[calc(100vh-100px)] px-4 md:px-9 lg:px-20 flex flex-col items-center justify-center`}>
      <div className={`w-full md:w-160 lg:w-176`}>
        <h1 className={`text-[1.27rem] sm:text-[1.5rem] text-center mb-6`}>Compare profiles of two Github users.</h1>

        <div className={`bg-white rounded-xl p-5 border border-gray-200 flex flex-col items-center gap-y-5 mb-8`}>
          <div className={`w-full flex flex-col md:flex-row gap-y-1 md:gap-x-4 items-center`}>
            <UsernameInput title={"USER 1"} username={user1} setUsername={setUser1}/>
            <div className={`py-2 px-2.5 bg-black text-white rounded-lg mt-4.5`}>VS</div>
            <UsernameInput title={"USER 2"} username={user2} setUsername={setUser2}/>
          </div>

          <button className={`bg-black text-white w-fit px-4 py-1.5 flex items-center justify-center gap-x-1 active:scale-95 transition-transform ease-out duration-150 rounded-sm`}>
            <MdCompareArrows className={`text-[1.3rem]`}/>
            <p className={`text-[0.88rem]`}>Compare</p>
          </button>
        </div>
      </div>
    </div>
  )
}

export default Compare