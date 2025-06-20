import React from 'react'
import { Route,Routes,Navigate } from 'react-router-dom'
import AdminLayout from '../layout/AdminLayout'
import Dashboard from '../pages/user/admin/Dashboard'
import ProductLists from '../pages/user/admin/ProductLists'
import ManageProducts from '../pages/user/admin/manageProducts/ManageProducts'
import AddProduct from '../pages/user/admin/AddProduct'
import AuthContainer from '../auth/AuthContainer'
import Category from '../pages/user/admin/Category'
function AdminRoutes() {

  return (

  <Routes>
    <Route path='/' element={<AdminLayout/>}>

  

    <Route path='/' element={<Dashboard/>}/>
    <Route path='product-lists' element={<ProductLists/>}/>
    <Route path='manage-products' element={<ManageProducts/>}/>
    <Route path='category' element={<Category/>}/>
    <Route path='add-products' element={<AddProduct/>}/>
    <Route path='login' element={<AuthContainer/>}/>
  

    

    </Route>
  </Routes>
  )
}

export default AdminRoutes
