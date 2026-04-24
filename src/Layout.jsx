import React from 'react'
import { Outlet } from 'react-router'
import Navbar from './components/Navbar'

function Layout() {
  return (
    <div className={`flex flex-col min-h-screen`}>
        <Navbar />
        <main className={`flex-1`}>
          <Outlet />
        </main>
    </div>
  )
}

export default Layout