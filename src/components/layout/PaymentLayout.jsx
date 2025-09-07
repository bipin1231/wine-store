
import { Outlet } from 'react-router-dom';
import PaymentHeader from '../newComponent/PaymentHeader';


function PaymentLayout() {
  return (
    <>

<PaymentHeader/>
      <Outlet />


    </>
  )
}

export default PaymentLayout
