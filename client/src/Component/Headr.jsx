import React, { useEffect } from 'react'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, NavLink, useNavigate } from 'react-router-dom'

export default function Headr() {
    const { currentUser } = useSelector((state) => state.user)
    const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set('searchTerm', searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get('searchTerm');
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [location.search]);
    return (
        
            <header className=' bg-slate-200 shadow-md' style={{zIndex:9999,top:"0px",position:"sticky"}}>
                <div className=' max-w-7xl flex justify-between items-center mx-auto p-3'>
                    <Link to='/' className=' md:text-2xl text-lg font-bold'>
                        <h1><span className=' text-slate-500'></span><span className=' text-slate-700'>Estate</span></h1>
                    </Link>
                    <form action="" onSubmit={ handleSubmit} className=' relative bg-slate-100 rounded-lg'>
                        <input  type="text"  value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} name="search" id="search" autoComplete='off' className=' md:w-80 sm:w-64 w-24 bg-transparent text-xs sm:text-base border rounded-lg font-medium py-2.5 px-4 focus:outline-none focus:border-cyan-800 transition' placeholder="Search..." />
                        <i className="ri-search-line absolute sm:top-3 top-2 right-2 sm:right-3"></i>
                    </form>
                    <ul className=' flex gap-4'>
                        <NavLink to="/" className='nav-link text-xl font-semibold relative hidden md:block'>Home</NavLink>
                        <NavLink to='/About' className='nav-link text-xl font-semibold relative hidden md:block'>About Us</NavLink>

                        <NavLink to='/profile'>
                            {currentUser ? (<img src={currentUser.avatar} alt="profile" className=' w-7 h-7 rounded-3xl bg-cover' />)
                                : (<NavLink to='/signin' className='nav-link md:text-xl text-lg font-semibold relative'>Sign In</NavLink>)
                            }
                        </NavLink>
                    </ul>
                </div>
            </header>
        
    )
}