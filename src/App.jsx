import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Route,RouterProvider,createBrowserRouter,createRoutesFromElements } from 'react-router-dom'

import WineStore from './components/WineStore'
import Layout from './Layout'

import HomePage from './components/HomePage'

function App() {

  const router=createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<Layout/>}>
      <Route path='/' element={<HomePage/>}/>

        

        </Route>

    )
  )

  return (

  <RouterProvider router={router}/>
     


  )
}

export default App
