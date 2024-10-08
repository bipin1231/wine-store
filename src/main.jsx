import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux';
import store from './redux/store.js';

import App from './App.jsx'
import { Route,RouterProvider,createBrowserRouter,createRoutesFromElements } from 'react-router-dom'
import Layout from './Layout'

import HomePage from './components/HomePage'

import './index.css'
import ProductCatalog from './components/ProductCatalog.jsx'

import CollectionPage from './components/CollectionPage.jsx'
import ProductPage from './components/ProductPage.jsx'
import CartPage from './components/CartPage.jsx';

const router=createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout/>}>
    <Route path='/' element={<HomePage/>}/>

       <Route path='product-catalog/:category' element={<ProductCatalog/>}/>
       <Route path='product-catalog' element={<ProductCatalog/>}/>
       <Route path='collection-page' element={<CollectionPage/>}/>

       <Route path='product-page/:productId' element={<ProductPage/>}/>
       <Route path='cart-page' element={<CartPage/>}/>
    

      </Route>

  )
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
<Provider store={store}>
<RouterProvider router={router}/>
 </Provider>
  </StrictMode>,
)
