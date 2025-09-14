import { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';

// Lazy-loaded pages
const HomePage = lazy(() => import("../newComponent/HomePage.jsx"));
const ProductCatalog = lazy(() => import("../newComponent/ProductCatalog.jsx"));
const CollectionPage = lazy(() => import("../pages/user/CollectionPage.jsx"));
const ProductPage = lazy(() => import("../pages/user/ProductPage.jsx"));
const EnhancedCartPage = lazy(() => import("../pages/user/CartPage.jsx"));
// const AuthContainer = lazy(() => import("../auth/AuthContainer.jsx"));
import AuthContainer from "../auth/AuthContainer.jsx";
import AuthLayout from '../layout/AuthLayout.jsx';
import UserLayout from '../layout/UserLayout.jsx';
import CartLayout from '../layout/CartLayout.jsx';
import CheckoutPage from '../newComponent/CheckoutPage.jsx';
import PaymentPage from '../newComponent/PaymentPage.jsx';
import UserProfilePage from '../newComponent/UserProfile.jsx';
import NormalLayout from '../layout/NormalLayout.jsx';
import PaymentLayout from '../layout/PaymentLayout.jsx';
import CartCheckoutPage from '../newComponent/CartCheckoutPage.jsx';
import CartPaymentPage from '../newComponent/CartPaymentPage.jsx';
export default function UserRoutes() {
  return (
    <Routes>
      <Route path='/' element={<UserLayout />}>
        <Route path='/' element={<HomePage />} />

        <Route path='product-catalog/:searchQuery' element={<ProductCatalog />} />
        <Route path='product-catalog/:search' element={<ProductCatalog />} />
        <Route path='product-catalog' element={<ProductCatalog />} />
        <Route path='collection-page' element={<CollectionPage />} />


        <Route path='product-page/:productId' element={<ProductPage />} />





      </Route>
      {/* Auth Layout */}
      <Route element={<AuthLayout />}>
        <Route path="auth" element={<AuthContainer />} />

      </Route>
      <Route element={<PaymentLayout />}>
        <Route path='checkout' element={<CheckoutPage />} />
         <Route path='cart-checkout' element={<CartCheckoutPage />} />
       
        <Route path='checkout/payment' element={<PaymentPage />} />
           <Route path='cart-checkout/payment' element={<  CartPaymentPage />} />

      </Route>
      <Route element={<CartLayout />}>
        <Route path="cart-page" element={<EnhancedCartPage />} />

      </Route>
      <Route element={<NormalLayout />}>
        <Route path='profile' element={<UserProfilePage />} />

      </Route>

    </Routes>
  )
}