import React from 'react'
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Carditem from '../pages/Carditem'


export default function Search() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [listing, setlisting] = useState([]);
    const [searchdata, setSearchdata] = useState({
        searchTerm: '',
        type: 'all',
        offer: false,
        furnished: false,
        parking: false,
        sort: 'createdAt',
        order: 'desc',
    });



    useEffect(() => {
        const useUrlprams = new URLSearchParams(location.search);
        const searchTermfromUrl = useUrlprams.get('searchTerm');
        const typefromUrl = useUrlprams.get('type');
        const offerfromUrl = useUrlprams.get('offer');
        const furnishedfromUrl = useUrlprams.get('furnished');
        const parkingfromUrl = useUrlprams.get('parking');
        const sortfromUrl = useUrlprams.get('sort');
        const orderfromUrl = useUrlprams.get('order');


        if (
            searchTermfromUrl ||
            typefromUrl ||
            offerfromUrl ||
            furnishedfromUrl ||
            parkingfromUrl ||
            sortfromUrl ||
            orderfromUrl

        ) {
            setSearchdata({
                searchTerm: searchTermfromUrl || '',
                type: typefromUrl || 'all',
                offer: offerfromUrl === 'true' ? true : false,
                furnished: furnishedfromUrl === 'true' ? true : false,
                parking: parkingfromUrl === 'true' ? true : false,
                sort: sortfromUrl || 'createdAt',
                order: orderfromUrl || 'desc',
            })
        };

        const feachLIsting = async () => {
            try {
                setLoading(true);

                const searchQuery = useUrlprams.toString();
                const res = await fetch(`/api/listing/get?${searchQuery}`);
                const data = await res.json();
                if (data.success === false) {
                    console.log(data.message);
                    setLoading(false);
                    return
                }
                setlisting(data);
                setLoading(false);
            } catch (error) {
                console.log(error);
                setLoading(false);
            }

        }

        feachLIsting()



    }, [location.search]);

    const handlchange = async (e) => {
        if (
            e.target.id === 'all' || e.target.id === 'rent' || e.target.id === 'sale'
        ) {
            setSearchdata({ ...searchdata, type: e.target.id });
        }

        if (e.target.id === 'searchTerm') {

            setSearchdata({ ...searchdata, searchTerm: e.target.value });
        }
        if (
            e.target.id === 'offer' ||
            e.target.id === 'furnished' ||
            e.target.id === 'parking'
        ) {
            setSearchdata({ ...searchdata, [e.target.id]: e.target.checked || e.target.checked });
        }

        if (e.target.id === 'sort') {
            const sort = e.target.value.split('_')[0] || 'created_at';
            const order = e.target.value.split('_')[1] || 'desc';
            setSearchdata({ ...searchdata, sort, order })
        }

    }
    const handlsubmit = (e) => {
        e.preventDefault();

        const urlPrams = new URLSearchParams();
        urlPrams.set('searchTerm', searchdata.searchTerm);
        urlPrams.set('type', searchdata.type);
        urlPrams.set('offer', searchdata.offer);
        urlPrams.set('furnished', searchdata.furnished);
        urlPrams.set('parking', searchdata.parking);
        urlPrams.set('sort', searchdata.sort);
        urlPrams.set('order', searchdata.order);

        const searchQuery = urlPrams.toString();
        navigate(`/search?${searchQuery}`);
    }



    return (
        <div className='flex flex-col md:flex-row'>
            <div className='bg-transparent border-b-2 sm:border-r-2 p-7 h-auto md:min-h-screen flex-2'>
                <form className='flex flex-col gap-8' onSubmit={handlsubmit}>
                    <div className='flex items-center gap-2'>
                        <label className='whitespace-nowrap'>Search Term:

                        </label>
                        <input type="text" id="searchTerm" placeholder="Search..."
                            className="border rounded-lg p-3 w-full" onChange={handlchange} value={searchdata.searchTerm}></input>
                    </div>

                    <div className='flex flex-wrap items-center gap-2'>
                        <label className="whitespace-nowrap">Type:</label>
                        <div className='flex gap-2'>
                            <input checked={searchdata.type === 'all'} type="checkbox" id="all" className="w-5" onChange={handlchange} ></input>
                            <span>Rent &amp; Sale</span>
                        </div>
                        <div className='flex gap-2'>
                            <input checked={searchdata.type === 'rent'} type="checkbox" id="rent" className="w-5" onChange={handlchange}></input>
                            <span>Rent</span>
                        </div>
                        <div className='flex gap-2'>
                            <input checked={searchdata.type === 'sale'} type="checkbox" id="sale" className="w-5" onChange={handlchange}></input>
                            <span>Sale</span>
                        </div>
                        <div className='flex gap-2'>
                            <input checked={searchdata.offer} type="checkbox" id="offer" className="w-5" onChange={handlchange}></input>
                            <span>Offer</span>
                        </div>
                    </div>

                    <div className='flex items-center gap-2'>
                        <label className="whitespace-nowrap">Amenities:</label>
                        <div className="flex gap-2">
                            <input checked={searchdata.parking} type="checkbox" id="parking" className="w-5" onChange={handlchange}></input>
                            <span>Parking</span>
                        </div>

                        <div className="flex gap-2">
                            <input checked={searchdata.furnished} type="checkbox" id="furnished" className="w-5" onChange={handlchange}></input>
                            <span>Furnished</span>
                        </div>
                    </div>

                    <div className='flex items-center gap-2'>
                        <label>Sort:</label>
                        <select id="sort" className="border  rounded-lg p-3" defaultValue='createdAt_desc' onChange={handlchange}>
                            <option value="regularPrice_desc">Price high to low</option>
                            <option value="regularPrice_asc">Price low to high </option>
                            <option value="createdAt_desc" >Latest</option>
                            <option value="createdAt_asc">Oldest</option></select>
                    </div>

                    <button className="bg-slate-700 text-white p-3 uppercase rounded-lg w-full" >
                        Search
                    </button>

                </form>
            </div>


            <div className='flex-1'>
                <h1 className="text-3xl m-5 font-semibold border-b p-3 text-slate-700">Listing results:</h1>

                <div className='p-7 flex flex-wrap gap-4'>
                    {!loading && listing.length < 1 && (
                        <p className='text-xl text-slate-700'>No listing found!</p>
                    )}
                    {loading ? (
                        <p className='text-xl text-slate-700 text-center w-full'>
                            Loading...
                        </p>

                    ) : (

                        <div className=' grid grid-flow-row grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5'>
                            {
                                Array.isArray(listing) &&
                                listing.map((item) => (
                                    <Carditem className='' key={item._id} item={item}></Carditem>
                                ))

                            }
                        </div>

                    )
                    }
                </div>
            </div>
        </div>
    )
}
