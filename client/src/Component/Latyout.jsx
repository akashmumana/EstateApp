import React from 'react'
import { Route, Routes } from "react-router-dom"
import Home from '../pages/Home'
import About from '../pages/About'
import Headr from './Headr'
import Signin from '../pages/Signin'
import Signup from '../pages/Signup'
import Profile from '../pages/Profile'
import PrivateRoute from './PrivateRoute'
import CreateListing from '../pages/CreateListing'
import Updatelisting from '../pages/Updatelisting'
import Listing from '../pages/Listing'
import Search from '../pages/Search'
import Carditem from '../pages/Carditem'




export default function Latyout() {
  return (
    <div>

      <Headr></Headr>
      <Routes>
        <Route path='/' element={<Home></Home>}></Route>
        <Route path='/About' element={<About></About>}></Route>
        <Route path='/Signin' element={<Signin></Signin>}></Route>
        <Route path='/Signup' element={<Signup></Signup>}></Route>
        <Route path='/search' element={<Search></Search>}></Route>
        <Route path='/listing/:id' element={<Listing></Listing>}></Route>
        <Route element={<PrivateRoute></PrivateRoute>}>
          <Route path='/profile' element={<Profile></Profile>}></Route>
          <Route path='/createlisting' element={<CreateListing></CreateListing>}></Route>
          <Route path='/updatelisting/:id' element={<Updatelisting></Updatelisting>}></Route>
        </Route>

      </Routes>


    </div>
  )
}
