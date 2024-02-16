import React from 'react'
import { useState,useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setError, signInFailuer, signInSuccess, signInstart } from '../redux/user/userSlice';
import Googleauth from '../Component/Googleauth';
export default function Signin() {
  const [formData, setfromData] = useState({})
  // const [error,setError] = useState(null);
  // const [loading, setLoading] = useState(false)
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.user);
  

  const changHandler = (e) => {
    setfromData({
      ...formData,
      [e.target.id]: e.target.value,
    })
  }
  // console.log(formData);
  const submitHandler = async (e) => {
    e.preventDefault();
    // setLoading(true)
    dispatch(signInstart())
    try {
      const res = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)

      })
      const data = await res.json();
      console.log(data);
      if (data.success === false) {
        // setError(data.message);
        // setLoading(false)
        dispatch(signInFailuer(data.message))
        return;
      }
      // setError(null)
      // setLoading(false)
      dispatch(signInSuccess(data))
      navigate('/')
    } catch (error) {
      // setLoading(false)
      // setError(error.message);
      dispatch(signInFailuer(error.message))
    }
  }
  useEffect(()=>{
    dispatch(setError())
  },[dispatch])
  return (
    <div>
      <div className=' max-w-lg mx-auto p-3'>
        <h1 className=' text-center text-3xl font-semibold text-slate-700 my-7'>Sign In</h1>
        <form action="" className=' flex flex-col gap-4' onSubmit={submitHandler}>
          <input type='email' onChange={changHandler} name='email' id='email' placeholder='Email' className=' border p-3 rounded-lg' />
          <input type='password' onChange={changHandler} name='password' autoComplete='off' id='password' placeholder='Password' className=' border p-3 rounded-lg' />
          <button disabled={loading} className=' bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>{loading ? "Loading..." : "Signin"}</button> 
        </form>
        <Googleauth></Googleauth>
        
        <div className=' text-center mt-5 '>
          <p className=' text-lg font-medium'>Don't Have an account ? <span className=' ms-2 font-semibold text-blue-500 hover:underline'><Link to='/signup'>Sign Up</Link></span></p>
        </div>
        {error && <p className='text-red-500 mt-5 text-center'>{error}</p>}
      </div>
    </div>
  )
}
