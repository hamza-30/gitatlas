import React from 'react'

function StatsCard({title, icon: Icon, data}) {
  return (
    <div className={`w-full flex flex-col px-4 py-4 gap-y-1 border bg-white border-gray-100 rounded-sm`}>
        <div className={`flex justify-between text-[#3a3a3a]`}>
            <span className={`text-xs`}>{title}</span>
            <Icon className={`text-[1.2rem]`}/>
        </div>

        <div className={`font-semibold text-[#3a3a3a]`}>{data}</div>
    </div>
  )
}

export default StatsCard