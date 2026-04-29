import React from 'react'

function LanguageInfo({language, percentage, color = "#ccc"}) {
  return (
    <div className={`flex justify-between text-gray-800 border-b border-b-gray-100 pb-0.5`}>
        <div className={`flex items-center gap-x-1.5`}>
            <div className={`h-[0.88rem] w-[0.88rem] rounded-sm mb-0.5`}
            style={{backgroundColor: color}}></div>
            <div className={`text-sm`}>{language}</div>
        </div>
        <div className={`text-sm`}>{percentage}%</div>
    </div>
  )
}

export default LanguageInfo