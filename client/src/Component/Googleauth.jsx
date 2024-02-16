import React from 'react'
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { app } from '../firebase';
import { useDispatch } from 'react-redux';
import { signInSuccess } from '../redux/user/userSlice';
import { useNavigate } from 'react-router-dom';

export default function Googleauth() {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const googleHandler = async (e) => {
    e.preventDefault();
    try {

      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);

      const resultdata = await signInWithPopup(auth, provider)
      // console.log(resultdata);


      const res = await fetch('/api/auth/google', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: resultdata.user.displayName,
          email: resultdata.user.email,
          photo: resultdata.user.photoURL
        })
      })
      const data = await res.json();
      console.log(data);
      dispatch(signInSuccess(data))
      navigate('/');
      
    } catch (error) {
      console.log(error)
    }

  }
  return (
    <>
      <button onClick={googleHandler} type='button' className=' bg-red-700 w-full text-white rounded-lg p-3 mt-4 uppercase hover:opacity-95'>Sign Up With Google</button>
    </>

  )
}
