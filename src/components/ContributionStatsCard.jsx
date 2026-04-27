import React from 'react'

function ContributionStatsCard({title, data}) {
  return (
    <div className={`px-3 py-2 w-full md:w-[11rem] flex flex-col border border-gray-200 gap-y-1 bg-gray-50`}>
        <div className={`text-xs text-[#3a3a3a]`}>{title}</div>
        <div className={`text-sm font-semibold`}>{data}</div>
    </div>
  )
}

export default ContributionStatsCard