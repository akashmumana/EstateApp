
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import Listingitem from './Carditem';

export default function Home() {

  const [offerlisting, setOferlisting] = useState([])
  const [salelisting, setSalelisting] = useState([])
  const [rentlisting, setRentlisting] = useState([])


  useEffect(() => {

    const fetchoffer = async () => {
      try {
        const res = await fetch(`/api/listing/get?offer=true&limit=4`)
        const data = await res.json()
        setOferlisting(data)

      } catch (error) {
        console.log(error);
      }

    };

    fetchoffer();
      const fetchsale = async () => {
        try {
          const res = await fetch(`/api/listing/get?type=sale&limit=4`)
          const data = await res.json()
          setSalelisting(data)
  
        } catch (error) {
          console.log(error);
        }
        
      };
      fetchsale();

      const fetchrent = async () => {
        try {
          const res = await fetch(`/api/listing/get?type=rent&limit=4`)
          const data = await res.json()
          setRentlisting(data)
  
        } catch (error) {
          console.log(error);
        }
      }
      fetchrent();
    
  }, [])

  return (
    <div>
      <div className='flex flex-col gap-6 p-28 px-3 max-w-6xl mx-auto'>
        <h1 className='text-slate-700 font-bold text-3xl lg:text-6xl'>
          Find your next <span className='text-slate-500'>perfect</span>
          <br />
          place with ease
        </h1>
        <div className='text-gray-400 text-xs sm:text-sm'>
          Sahand Estate is the best place to find your next perfect place to
          live.
          <br />
          We have a wide range of properties for you to choose from.
        </div>
        <Link to={'/search'}
          className='text-xs sm:text-sm text-blue-800 font-bold hover:underline'> Let's get started...</Link>
      </div>


      <Swiper navigation>
        {offerlisting &&
          offerlisting.length > 0 &&
          offerlisting.map((item) => (
            <SwiperSlide>
              <div
                style={{
                  background: `url(${item.imageUrl[0]}) center no-repeat`,
                  backgroundSize: 'cover',
                }}
                className='h-[500px]'
                key={item._id}
              ></div>
            </SwiperSlide>
          ))}
      </Swiper>



      <div className='max-w-6xl mx-auto p-3 flex flex-col gap-8 my-10'>
        <div className=''>
          <div className='my-3'>
            <h2 className='text-2xl font-semibold text-slate-600'>Recent offers</h2>
            <Link className='text-sm text-blue-800 hover:underline' to={'/search?offer=true'}>Show more offers</Link>
          </div>
          <div className='flex flex-wrap gap-4'>
            {offerlisting.map((item) => (
              <Listingitem key={item._id} item={item} />
            ))}
          </div>
        </div>
        <div className=''>
          <div className='my-3'>
            <h2 className='text-2xl font-semibold text-slate-600'>Recent places for rent</h2>
            <Link className='text-sm text-blue-800 hover:underline' to={'/search?offer=true'}>Show more places for rent</Link>
          </div>
          <div className='flex flex-wrap gap-4'>
            {rentlisting.map((item) => (
              <Listingitem key={item._id} item={item} />
            ))}
          </div>
        </div>
        <div className=''>
          <div className='my-3'>
            <h2 className='text-2xl font-semibold text-slate-600'>Recent places for sale</h2>
            <Link className='text-sm text-blue-800 hover:underline' to={'/search?offer=true'}>Show more places for sale</Link>
          </div>
          <div className='flex flex-wrap gap-4'>
            {salelisting.map((item) => (
              <Listingitem key={item._id} item={item} />
            ))}
          </div>
        </div>
      </div>



    </div>
  )
}
