import React from 'react'
import vila from '../assets/img/vila.jpg'
import liveingroom from '../assets/img/livingroom.jpg'
import hometwo from '../assets/img/mountain-cabin05-600x473.jpg'
import homeone from '../assets/img/vilatwo.jpg'
import { MdHomeWork } from "react-icons/md";
import { MdMapsHomeWork } from "react-icons/md";
import { IoHomeSharp } from "react-icons/io5";
import { IoDocumentTextSharp } from "react-icons/io5";
import { FaKey } from "react-icons/fa";

export default function About() {
  return (
    <div>
      <div className='object-cover' style={{ backgroundImage: `url(${vila})`, backgroundSize: 'cover', height: '70vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <div className="flex flex-col justify-center">
          <div className="flex flex-col md:flex-row justify-center items-center">
            <div>
              <h1 className='text-7xl text-white'>About Us</h1>
            </div>
          </div>
        </div>
      </div>

      <div className=' container mx-auto py-24 px-4'>
        <div className='mb-16'>
          <h2 className=' text-center text-slate-700 font-bold text-3xl lg:text-5xl'>How It works?
            <br />  Find a
            <span className='text-slate-500'> perfect home</span></h2>

        </div>
        <div className=' grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>

          <div className=' pe-5 pb-2 flex flex-col items-end md:border-e-2 border-gray-400 '>
            <div >
              <MdMapsHomeWork className='text-5xl text-slate-700 ' />
              <h3 className='mt-4 text-2xl font-bold text-slate-600'>Find real estate</h3>
              <p className='text-lg font-normal text-gray-500 mt-1'>
                Sumo petentium ut per, at his wisim utinam adipiscing. Est ei graeco quod suavitate vix.
              </p>
            </div>
          </div>
          <div className=' pe-5 pb-2 flex flex-col items-end md:border-e-2 border-gray-400 '>
            <div >

              <IoHomeSharp className='text-5xl text-slate-700 ' />
              <h3 className='mt-4 text-2xl font-bold text-slate-600'>Meet relator</h3>
              <p className='text-lg font-normal text-gray-500 mt-1'>
                Sumo petentium ut per, at his wisim utinam adipiscing. Est ei graeco quod suavitate vix.
              </p>
            </div>
          </div>
          <div className=' pe-5 pb-2 flex flex-col items-end md:border-e-2 border-gray-400 '>
            <div >
              <IoDocumentTextSharp className='text-5xl text-slate-700 ' />
              <h3 className='mt-4 text-2xl font-bold text-slate-600'>Documents</h3>
              <p className='text-lg font-normal text-gray-500 mt-1'>
                Sumo petentium ut per, at his wisim utinam adipiscing. Est ei graeco quod suavitate vix.
              </p>
            </div>
          </div>
          <div className=' pe-5 pb-2 flex flex-col items-end  '>
            <div >
              <FaKey className='text-5xl text-slate-700' />
              <h3 className='mt-4 text-2xl font-bold text-slate-600'>Find real estate</h3>
              <p className='text-lg font-normal text-gray-500 mt-1'>
                Sumo petentium ut per, at his wisim utinam adipiscing. Est ei graeco quod suavitate vix.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center mt-7">
        <div className="flex flex-col justify-center">
          <div className="flex flex-col md:flex-row max-w-7xl justify-center items-center">
            <div className="overflow-hidden w-full m-4 shadow-sm flex flex-col md:flex-row justify-center">
              <div className="flex flex-col md:flex-row items-center">
                <img src={liveingroom} alt="Living Room" class="w-full md:w-1/2 lg:w-1/3 xl:w-1/4" />
                <div className="w-full md:w-1/2 lg:w-2/3 xl:w-3/4 m-4">
                  <div className="flex text-gray-500 text-sm m-2">
                    <div className="m-1 font-bold">- Amenities</div>

                  </div>
                  <div className="text-slate-700 font-bold text-3xl">Kind to Both - Nature & People</div>
                  <div className="text-m text-gray-500 mt-4 m-2">
                    <a href="#">The RealHomes is a condo in Asheville, NC. The land around it was left untouched, and the surrounding apartments are built from sustainable materials.</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center mt-7">
        <div className="flex flex-col justify-center">
          <div className="flex flex-col md:flex-row max-w-7xl justify-center items-center">
            <div className="overflow-hidden w-full m-4 shadow-sm flex flex-col md:flex-row justify-center">
              <div className="flex flex-col md:flex-row items-center">
                <img src={hometwo} alt="Living Room" class="w-full md:w-1/2 lg:w-1/3 xl:w-1/4" />
                <div className="w-full md:w-1/2 lg:w-2/3 xl:w-3/4 m-4">
                  <div className="flex text-gray-500 text-sm m-2">
                    <div className="m-1 font-bold">- Amenities</div>

                  </div>
                  <div className="text-slate-700 font-bold text-3xl">A New Way to Live</div>
                  <div className="text-m text-gray-500 mt-4 m-2">
                    <a href="#">The RealHomes is a condo in Asheville, NC. The land around it was left untouched, and the surrounding apartments are built from sustainable materials.</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center mt-7">
        <div className="flex flex-col justify-center">
          <div className="flex flex-col md:flex-row max-w-7xl justify-center items-center">
            <div className="overflow-hidden w-full m-4 shadow-sm flex flex-col md:flex-row justify-center">
              <div className="flex flex-col md:flex-row items-center">
                <img src={homeone} alt="Living Room" class="w-full md:w-1/2 lg:w-1/3 xl:w-1/4" />
                <div className="w-full md:w-1/2 lg:w-2/3 xl:w-3/4 m-4">
                  <div className="flex text-gray-500 text-sm m-2">
                    <div className="m-1 font-bold">- Amenities</div>

                  </div>
                  <div className="text-slate-700 font-bold text-3xl">Check Real
                    Homes
                    Apartments</div>
                  <div className="text-m text-gray-500 mt-4 m-2">
                    <a href="#">The RealHomes is a condo in Asheville, NC. The land around it was left untouched, and the surrounding apartments are built from sustainable materials.</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
