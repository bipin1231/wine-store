import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux';
import store from './redux/store.js';

import App from './App.jsx'


import './index.css'


// const router=createBrowserRouter(
//   createRoutesFromElements(
//     <Route path='/' element={<Layout/>}>
//     <Route path='/' element={<HomePage/>}/>

//        <Route path='product-catalog/:category' element={<ProductCatalog/>}/>
//        <Route path='product-catalog/:search' element={<ProductCatalog/>}/>
//        <Route path='product-catalog' element={<ProductCatalog/>}/>
//        <Route path='collection-page' element={<CollectionPage/>}/>

//        <Route path='product-page/:productId' element={<ProductPage/>}/>
//        <Route path='cart-page' element={<CartPage/>}/>
    

//       </Route>

//   )
// )

createRoot(document.getElementById('root')).render(
  <StrictMode>
<Provider store={store}>
{/* <RouterProvider router={router}/> */}
<App/>
 </Provider>
  </StrictMode>,
)
