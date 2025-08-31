
import { Outlet } from 'react-router-dom';
import SimpleHeader from '../newComponent/SimpleHeader.jsx';

function NormalLayout() {
  return (
    <>
      <SimpleHeader />


      <Outlet />


    </>
  )
}

export default NormalLayout
