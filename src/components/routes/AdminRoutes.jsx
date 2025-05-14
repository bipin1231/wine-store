import React from 'react'
import { Route,Routes,Navigate } from 'react-router-dom'
import AdminLayout from '../layout/AdminLayout'
import Dashboard from '../pages/user/admin/Dashboard'
import ProductLists from '../pages/user/admin/ProductLists'
import ManageProducts from '../pages/user/admin/ManageProducts'
import AddProduct from '../pages/user/admin/AddProduct'
import LoginPage from '../loginSignupPages/LoginPage'
import OAuth2Callback from '../loginSignupPages/OAuth2Callback'
function AdminRoutes() {

  return (

  <Routes>
    <Route path='/' element={<AdminLayout/>}>

  

    <Route path='/' element={<Dashboard/>}/>
    <Route path='product-lists' element={<ProductLists/>}/>
    <Route path='manage-products' element={<ManageProducts/>}/>
    <Route path='add-products' element={<AddProduct/>}/>
    <Route path='login' element={<LoginPage/>}/>
    <Route path='/oauth2/callback/' element={<OAuth2Callback/>}/>

    

    </Route>
  </Routes>
  )
}

export default AdminRoutes
