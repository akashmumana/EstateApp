
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage'
import { app } from '../firebase';
import {
  updateuserStart, updateuserfail, updateusersuccess, deleteuserStart,
  deleteusersuccess, deleteuserfail, signoutuserStart, signoutusersuccess, signoutuserfail
} from '../redux/user/userSlice';



export default function Profile() {

  const fileRef = useRef(null);
  const { currentUser, error } = useSelector((state) => state.user);

  const [file, setFile] = useState(undefined)
  // console.log(file);
  const [filepers, setFilepers] = useState(0)
  // console.log(filepers);
  const [fileUploadError, setFileUploadError] = useState(false);
  
  const [formData, setformData] = useState({});
  const [showListingsError, setShowListingsError] = useState(false);
  const [userListings, setUserListings] = useState([]);

  useEffect(() => {
    if (file) {
      handalflieUpoad(file)
    }
  }, [file])

  const handalflieUpoad = (file) => {
    const storage = getStorage(app);

    const filename = new Date().getTime() + file.name;

    const stroageref = ref(storage, filename)

    const uploadTask = uploadBytesResumable(stroageref, file)

    uploadTask.on('state_changed', (snapshot) => {
      const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
      setFilepers(progress)
    }, (error) => {
      setFileUploadError(true);
      console.log(error);
    }, () => {
      getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
        // console.log(downloadUrl);
        setformData({
          ...formData,
          avatar: downloadUrl
        })
      })
    })
  }
  const changeHandler = (e) => {
    setformData({
      ...formData,
      [e.target.id]: e.target.value,
    })

  }

  const dispatch = useDispatch();
  const [updateSuccess, setUpdateSuccess] = useState();

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      dispatch(updateuserStart())

      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })

      const data = await res.json();
      console.log(data);
      if (data.success === false) {
        dispatch(updateuserfail(data.message))
        return;
      }
      dispatch(updateusersuccess(data))
      setUpdateSuccess(true)

    } catch (error) {
      dispatch(updateuserfail(error.message));
    }
  }

  const deleteuserHandler = async () => {
    try {
      dispatch(deleteuserStart())

      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: 'DELETE',

      })
      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteuserfail(data.message))
        return;
      }
      dispatch(deleteusersuccess(data));
    } catch (error) {
      dispatch(deleteuserfail(error.message));
    }
  }

  const signoutuserHandler = async () => {
    try {
      dispatch(signoutuserStart())

      const res = await fetch(`/api/user/signout/${currentUser._id}`, {
        method: 'DELETE',

      })
      const data = await res.json();
      if (data.success === false) {
        dispatch(signoutuserfail(data.message))
        return;
      }
      dispatch(signoutusersuccess(data));
    } catch (error) {
      dispatch(signoutuserfail(error.message));
    }
  }


  const showlistingHandler = async () => {
    try {
      setShowListingsError(false)
      const res = await fetch(`/api/user/listings/${currentUser._id}`)
      const data = await res.json()
      setUserListings(data)

    } catch (error) {
      setShowListingsError(true)
    }
  }
  const deletelistingHandler = async (listingId) => {
    try {
      const res = await fetch(`/api/listing/delete/${listingId}`,
        { method: 'DELETE' })
      const data = await res.json();
      if (data.success === false) {
        console.log(data.message);
        return;
      }
      setUserListings((prev) => prev.filter((listing) => listing._id !== listingId))
    } catch (error) {
      console.log(error.message)
    }
  }

  return (

    <div className='p-3 max-w-lg mx-auto'>
      <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>

      <form onSubmit={submitHandler} className='flex flex-col gap-4'>

        <input type="file" onChange={(e) => setFile(e.target.files[0])} ref={fileRef} hidden accept='image/*' />
        <img onClick={() => fileRef.current.click()} src={formData.avatar || currentUser.avatar} className='rounded-full h-24 w-24 object-cover self-center mt-2' alt="Profile"></img>

        <p className=' text-sm self-center'>
          {
            fileUploadError ?
              (<span className='text-red-700 font-semibold'>Error Image upload(image must be less than 2 MB)</span>)
              : filepers > 0 && filepers < 100 ? (<span className='text-slate-700'>{`Uploading ${filepers}%`}</span>)
                : filepers === 100 ?

                  (<span className='text-green-700'>Image Successfully Uploaded!</span>)
                  : ""
          }


        </p>

        <input type='name' onChange={changeHandler} defaultValue={currentUser.username} id='username' placeholder='Username' className='border p-3 rounded-lg'></input>
        <input type='email' onChange={changeHandler} defaultValue={currentUser.email} id='email' placeholder='Email' className='border p-3 rounded-lg'></input>
        <input type='password' autoComplete='false' onChange={changeHandler} id='password' placeholder='Password' className='border p-3 rounded-lg'></input>
        <button type='submit' className='bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80'>Update</button>
        <Link to="/createlisting">
          <button type='button' className='bg-green-700 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80 w-full'>createlisting</button>
        </Link>
      </form>
      <div className='flex justify-between mt-5'>
        <span onClick={deleteuserHandler} className='text-red-700 cursor-pointer'>Delete Account</span>
        <span onClick={signoutuserHandler} className='text-red-700 cursor-pointer'>Sign Out</span>

      </div>
      <p className='text-red-700 mt-5 text-center font-semibold'>{error ? error : ""}</p>
      <p className='text-green-700 mt-5 text-center font-semibold'>{updateSuccess ? "Your Profile Updated Successfully....!" : ""}</p>


      <button onClick={showlistingHandler} className='text-green-700 w-full'>
        Show Listing</button>
      <p>{showListingsError ? "Error showing listings" : ""}</p>
      {
        userListings.length > 0 ?
          (
            <div className='flex flex-col gap-4'>
              <h1 className='text-2xl text-center mt-7 font-semibold'>Your Listing</h1>
              {
                userListings.map((listing) =>
                (
                  <div key={listing._id} className='border rounded-lg p-3 flex justify-between items-center gap-4'>
                    <Link to={`/listing/${listing._id}`}>
                      <img src={listing.imageUrl[0]} alt='listing cover' className='h-16 w-16 object-contain' />
                    </Link>
                    <Link className='flex-1 text-slate-700 font-semibold hover:underline truncate'
                      to={`/listing/${listing._id}`}>
                      <p className=''>{listing.name}</p>
                    </Link>
                    <div className='flex flex-col items-center'>
                      <button onClick={()=>deletelistingHandler(listing._id)} className='text-red-700 uppercase'>Delete</button>

                      <Link to={`/updatelisting/${listing._id}`}>
                      <button className='text-green-700 uppercase'>Edit</button>
                      </Link>
                      
                    </div>
                  </div>
                ))
              }
            </div>
          ) : ""
      }

    </div>

  )

}


