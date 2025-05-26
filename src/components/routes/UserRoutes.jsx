import HomePage from '../pages/user/HomePage.jsx'




import { Route, Routes } from 'react-router-dom';
import UserLayout from '../layout/UserLayout.jsx';
import ProductCatalog from '../pages/user/ProductCatalog.jsx';
import CollectionPage from '../pages/user/CollectionPage.jsx';
import ProductPage from '../pages/user/ProductPage.jsx';
import EnhancedCartPage from '../pages/user/CartPage.jsx';
import AuthContainer from '../auth/AuthContainer'
export default function UserRoutes(){
return(
  <Routes>
    <Route path='/' element={<UserLayout/>}>
    <Route path='/' element={<HomePage/>}/>

<Route path='product-catalog/:category' element={<ProductCatalog/>}/>
<Route path='product-catalog/:search' element={<ProductCatalog/>}/>
<Route path='product-catalog' element={<ProductCatalog/>}/>
<Route path='collection-page' element={<CollectionPage/>}/>

<Route path='product-page/:productId' element={<ProductPage/>}/>
<Route path='cart-page' element={<EnhancedCartPage/>}/>
    <Route path='login' element={<AuthContainer/>}/>

    </Route>
  </Routes>
)
}