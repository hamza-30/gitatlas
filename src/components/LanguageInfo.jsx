import React from 'react'

function LanguageInfo() {
  return (
    <div className={`flex justify-between text-gray-800 border-b border-b-gray-100 pb-0.5`}>
        <div className={`flex items-center gap-x-1.5`}>
            <div className={`h-[0.88rem] w-[0.88rem] bg-amber-300 rounded-sm mb-0.5`}></div>
            <div className={`text-sm`}>JavaScript</div>
        </div>
        <div className={`text-sm`}>48%</div>
    </div>
  )
}

export default LanguageInfo