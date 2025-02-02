'use client'
import StatusFilter from '@/components/Filter/StatusFilter'
import Status from '@/components/Status'
import React from 'react'



function Dashboard() {

  return (
    <div className="flex-1 p-4 ">
       <h1 className="text-xl lg:text-2xl font-bold ">Dashboard</h1>
       <Status />
<StatusFilter />
    </div>
  )
}

export default Dashboard
