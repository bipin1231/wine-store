import React from 'react'
import { Outlet } from 'react-router-dom'
import AdminNavbar from '../navbar/AdminNavbar'
import AdminSidebar from '../sidebar/AdminSidebar'
function AdminLayout() {
  return (
   
 
    <div className="flex-1 flex flex-col overflow-hidden">
    <AdminNavbar/>
    <div className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-6">
    <Outlet/>
    </div>
    </div>

  )
}

export default AdminLayout
