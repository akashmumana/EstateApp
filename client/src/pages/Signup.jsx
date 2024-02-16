import React  from 'react'
import { useState,useEffect } from 'react';
import { Link ,useNavigate} from 'react-router-dom'
import {useDispatch,useSelector} from 'react-redux'
import { signInstart,signInFailuer, signInSuccess ,setError} from '../redux/user/userSlice';
import Googleauth from '../Component/Googleauth';
export default function Signup() {

  const [formData, setfromData] = useState({})
  // const [error,setError] = useState(null);
  // const [loading, setLoading] = useState(false)
  const {loading ,error } = useSelector((state)=>state.user);
  
  const navigate = useNavigate();
  const dispatch = useDispatch();

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

    dispatch(signInstart());
    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
  
      })
      const data = await res.json();
      console.log(data);
      if(data.success === false){
        // setError(data.message);
        // setLoading(false)
        dispatch( signInFailuer(data.message))
        return;
      }
      // setError(null)
      // setLoading(false)
      dispatch(signInSuccess(data))
      navigate("/signin")
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
        <h1 className=' text-center text-3xl font-semibold text-slate-700 my-7'>Sign UP</h1>
        <form action="" className=' flex flex-col gap-4' onSubmit={submitHandler}>
          <input type='text' name='username' id='username' onChange={changHandler} placeholder='Username' className=' border p-3 rounded-lg' />
          <input type='email' name='email' id='email' onChange={changHandler} placeholder='Email' className=' border p-3 rounded-lg' />
          <input type='password' name='password' autoComplete='off' onChange={changHandler} id='password' placeholder='Password' className=' border p-3 rounded-lg' />
          <button disabled={loading} className=' bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>{loading ? "Loading..." : "Sign Up"}</button>
          
        </form>

      <Googleauth></Googleauth>
        <div className=' text-center mt-5 '>
          <p className=' text-lg font-medium'>Have an account ? <span className=' ms-2 font-semibold text-blue-500 hover:underline'><Link to='/signin'>Sign in</Link></span></p>
        </div>
        {error && <p className='text-red-500 mt-5 text-center'>{error}</p>}
      </div>

    </div>
  )
}
