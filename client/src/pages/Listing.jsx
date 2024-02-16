import React, { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { useParams } from 'react-router-dom'
import { Navigation } from 'swiper/modules';
import { FaShare, FaMapMarkerAlt, FaBed, FaParking, FaBath, FaChair } from 'react-icons/fa'



export default function Listing() {
    const [listing, setlisting] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const { id } = useParams();
    const [copied, setCopied] = useState(false);

    const displayprice = Number(listing && listing.regularPrice) - Number(listing && listing.discountPrice);

    const capitalize = (pri) => {
        return pri.charAt(0).toUpperCase() + pri.slice(1);
    }

    useEffect(() => {

        const fechListing = async (e) => {

            try {
                setLoading(true)
                const res = await fetch(`/api/listing/get/${id}`)
                const data = await res.json();
                console.log(data)
                if (data.success === false) {
                    setError(true);
                    setLoading(false);
                    return;
                }
                setlisting(data)
                setLoading(false)
                setError(false)

            } catch (error) {
                setError(true)
                setLoading(false)

            }

        }

        fechListing();

    }, [id])

    return (
        <div>
            <div> {loading === true ?
                (<p className="text-center my-7 text-2xl font-semibold text-green-700">Loading</p>)
                : error === true ? (
                    <p className="text-center my-7 text-2xl font-semibold text-green-700">Something Went Wrong!</p>)
                    : listing !== null ?
                        (
                            <Swiper navigation={true} modules={[Navigation]}>
                                {
                                    listing.imageUrl.map((url) => (
                                        <SwiperSlide key={url}>
                                            <div className=' h-[500px]   '
                                                style={{ background: `url(${url}) center no-repeat`, backgroundSize: 'cover' }}></div>
                                        </SwiperSlide>
                                    ))
                                }

                            </Swiper>



                        ) : ""}
                <div className='fixed top-[13%] right-[3%] z-10 border rounded-full w-12 h-12 flex justify-center items-center bg-slate-100 cursor-pointer'>
                    <FaShare
                        className='text-slate-500'
                        onClick={() => {
                            navigator.clipboard.writeText(window.location.href);
                            setCopied(true);
                            setTimeout(() => {
                                setCopied(false);
                            }, 2000);
                        }}
                    />
                </div>
                {copied && (
                    <p className='fixed top-[23%] right-[5%] z-10 rounded-md bg-slate-100 p-2'>
                        Link copied!
                    </p>
                )}

                {listing !== null && listing.name !== null ? (
                    <div className='flex flex-col max-w-4xl mx-auto p-3 my-7 gap-6'>
                        <div className='w-full'>
                            <p className='text-2xl font-semibold'>
                                {listing.name} - ${' '}
                                {listing.offer
                                    ? listing.discountPrice.toLocaleString('en-US')
                                    : listing.regularPrice.toLocaleString('en-US')}
                                {listing.type === 'rent' && ' / month'}
                            </p>

                            <p className='flex items-center mt-6 gap-2 text-slate-600 font-semibold my-2 text-sm'>
                                <FaMapMarkerAlt className='text-green-700' />
                                {listing.address}
                            </p>

                            <div className='flex gap-4 justify-start items-center'>
                                <p className='bg-red-900 w-full max-w-[200px] text-white text-center p-1 rounded-md'>
                                    {listing.type === 'rent' ? 'For Rent' : 'For Sale'}
                                </p>
                                {listing.offer && (
                                    <p className='bg-green-900 w-full max-w-[200px] text-white text-center p-1 rounded-md'>
                                        ${+listing.regularPrice - +listing.discountPrice} Discount
                                    </p>
                                )}
                            </div>

                            <p className='text-slate-800 my-3'>
                                <span className='font-semibold text-black'>Description - </span>
                                {listing.description}
                            </p>
                            <ul className='text-green-900 font-semibold text-sm flex flex-wrap items-center gap-4 sm:gap-6'>
                                <li className='flex items-center gap-1 whitespace-nowrap '>
                                    <FaBed className='text-lg' />
                                    {listing.bedrooms > 1
                                        ? `${listing.bedrooms} beds `
                                        : `${listing.bedrooms} bed `}
                                </li>
                                <li className='flex items-center gap-1 whitespace-nowrap '>
                                    <FaBath className='text-lg' />
                                    {listing.bathrooms > 1
                                        ? `${listing.bathrooms} baths `
                                        : `${listing.bathrooms} bath `}
                                </li>
                                <li className='flex items-center gap-1 whitespace-nowrap '>
                                    <FaParking className='text-lg' />
                                    {listing.parking ? 'Parking spot' : 'No Parking'}
                                </li>
                                <li className='flex items-center gap-1 whitespace-nowrap '>
                                    <FaChair className='text-lg' />
                                    {listing.furnished ? 'Furnished' : 'Unfurnished'}
                                </li>
                            </ul>

                        </div>
                    </div>
                ) : null}

            </div>
        </div>
    )
}
