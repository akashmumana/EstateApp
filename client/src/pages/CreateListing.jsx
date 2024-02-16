import React, { useState } from 'react'
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { app } from '../firebase';
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'



export default function CreateListing() {
    const [files, setfiles] = useState([]);
    const [fromdata, setfromdata] = useState({
        imageUrl: [],
        name: "",
        description: "",
        address: "",
        type: 'rent',
        bedrooms: 1,
        bathrooms: 1,
        regularPrice: 50,
        discountPrice: 0,
        offer: false,
        parking: false,
        furnished: false
    });
    const navigate = useNavigate();
    const [imageUploaderror, setimageUploaderror] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState();
    const [loading, setLoading] = useState(false);
    const { currentUser } = useSelector((state) => state.user)

    // console.log(fromdata)




    const imgageSubmitHandler = (e) => {
        e.preventDefault()
        if (files.length > 0 && files.length + fromdata.imageUrl.length < 7) {
            const promises = [];
            setUploading(true)

            for (let i = 0; i < files.length; i++) {
                promises.push(storagImage(files[i]));
            }
            Promise.all(promises).then((urls) => {
                setfromdata({
                    ...fromdata,
                    imageUrl: fromdata.imageUrl.concat(urls)
                })
                setimageUploaderror(true)
                setUploading(false)
            }).catch((err) => {
                console.log(err);
                setUploading(false)
                setimageUploaderror('Image Upload Failed(2 max per image)')
            })

        } else {
            setimageUploaderror("you can only upload 6 image per listing    ")
            setUploading(false)
        }


    }
    const storagImage = (file) => {
        return new Promise((resolve, reject) => {
            const storage = getStorage(app);
            const fileName = new Date().getTime() + file.name;
            const storageRef = ref(storage, fileName);
            const uploadTask = uploadBytesResumable(storageRef, file);
            uploadTask.on(
                "state_changed", (sanpshot) => {
                    const progress = (sanpshot.bytesTransferred / sanpshot.totalBytes) * 100;
                    // console.log(progress)
                    console.log(`upload is ${progress}`)
                },
                (error) => {
                    reject(error)
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        resolve(downloadURL)

                    })
                }
            )
        })

    }

    const imageRemoveHandler = (index) => {
        setfromdata({
            ...fromdata,
            imageUrl: fromdata.imageUrl.filter((_, i) => i !== index)
        })
    }

    const changeHandler = (e) => {
        if(e.target.id === 'rent' || e.target.id ==='sale'){
            setfromdata({...fromdata, type:e.target.id})
        }
        if(e.target.id === 'parking' || e.target.id ==='furnished' || e.target.id ==='offer'){
            setfromdata({...fromdata, [e.target.id]:e.target.checked})
        }
        if(e.target.type === 'number' || e.target.type==='text' || e.target.type ==="checkboxs" ){
            setfromdata({...fromdata, [e.target.id]:e.target.value})
        }
        if(e.target.id ==='description' ){
            setfromdata({...fromdata, description:e.target.value})
        }

    }
    const fromSubmitHandler = async(e) => {
        e.preventDefault();
        try {
            if(fromdata.imageUrl.length<1){
                return setError("You must upload at least one image")
            }
            if(+fromdata.regularPrice< +fromdata.discountPrice){
                return setError("Discount price must be lower than regular price")
            }
            setLoading(true)
            setError(false)
            

            const res = await fetch('/api/listing/create',{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({...fromdata,userRef:currentUser._id})
            })
            const data = await res.json()
            if(data.success === false){
                setError(data.message)
                setLoading(false)
                return
            }
            navigate(`/listing/${data._id}`)
            setLoading(false)
        } catch (error) {
            setError(error.message)
            setLoading(false)
        }

    }

    return (
        <div className="p-3 max-w-4xl mx-auto">
            <h1 className="text-3xl font-semibold text-center my-7">Create a Listing</h1>
            <form className="flex flex-col sm:flex-row gap-4" onSubmit={fromSubmitHandler}>
                <div className="flex flex-col gap-4 flex-1">
                    <input type="text" onChange={changeHandler} value={fromdata.name} placeholder="Name" className="border p-3 rounded-lg" id="name"  required ></input>
                    <textarea onChange={changeHandler} value={fromdata.description} type="text" placeholder="Description" className="border p-3 rounded-lg" id="description" required></textarea>
                    <input onChange={changeHandler} value={fromdata.address} type="text" placeholder="Address" className="border p-3 rounded-lg" id="address" required></input>
                    <div className="flex gap-6 flex-wrap">
                        <div className="flex gap-2">
                            <input onChange={changeHandler} checked={fromdata.type === 'sale'} type="checkbox" id="sale" className="w-5"></input>
                            <span>Sale</span>
                        </div>
                        <div className="flex gap-2">
                            <input onChange={changeHandler} checked={fromdata.type === 'rent'} type="checkbox" id="rent" className="w-5"></input>
                            <span>Rent</span>
                        </div>
                        <div className="flex gap-2">
                            <input onChange={changeHandler} checked={fromdata.parking} type="checkbox" id="parking" className="w-5"></input>
                            <span>Parking spot</span>
                        </div>
                        <div className="flex gap-2">
                            <input onChange={changeHandler} checked={fromdata.furnished} type="checkbox" id="furnished" className="w-5"></input>
                            <span>Furnished</span>
                        </div>
                        <div className="flex gap-2">
                            <input onChange={changeHandler} checked={fromdata.offer} type="checkbox" id="offer" className="w-5"></input>
                            <span>Offer</span>
                        </div>
                    </div>
                    <div className="flex flex-wrap gap-6">
                        <div className="flex items-center gap-2">
                            <input onChange={changeHandler} value={fromdata.bedrooms} type="number" id="bedrooms" min="1" max="10" className="p-3 border
                             border-gray-300 rounded-lg" required></input>
                            <p>Beds</p>
                        </div>
                        <div className="flex items-center gap-2">
                            <input onChange={changeHandler} value={fromdata.bathrooms} type="number" id="bathrooms" min="1" max="10" className="p-3 border border-gray-300 rounded-lg" required></input>
                            <p>Baths</p>
                        </div>
                        <div className="flex items-center gap-2">
                            <input onChange={changeHandler} value={fromdata.regularPrice} type="number" id="regularPrice" min="1" max="1000000" className="p-3 border border-gray-300 rounded-lg" required></input>
                            <div className="flex flex-col items-center">
                                <p>Regular price</p>
                                {
                                    fromdata.type === "rent" && (
                                        <span className="text-xs">($ / Month)</span>
                                    )
                                }

                            </div>
                        </div>
                        {
                            fromdata.offer === true ? (
                                <div className="flex items-center gap-2">
                                    <input onChange={changeHandler} value={fromdata.discountPrice} type="number" id="discountPrice" min="1" max="1000000" className="p-3 border border-gray-300 rounded-lg" required></input>
                                    <div className="flex flex-col items-center">
                                        <p>Discounted price</p>
                                        {
                                            fromdata.type === "rent" && (
                                                <span className="text-xs">($ / Month)</span>
                                            )
                                        }

                                    </div>
                                </div>
                            ):''
                        }

                    </div>
                </div>
                <div className="flex flex-col flex-1 gap-4">
                    <p className="font-semibold">
                        Images:
                        <span className="font-normal text-gray-600 ml-2">The first image will be the cover (max 6)</span>
                    </p>
                    <div className="flex gap-4">
                        <input type="file" onChange={(e) => setfiles(e.target.files)} id="images" className="p-3 border border-gray-300 rounded w-full"
                            accept="image/*" multiple></input>
                        <button type='button' onClick={imgageSubmitHandler} disabled={uploading} className="p-3 text-green-700 rounded border border-green-700 hover:bg-green-700
                                           hover:text-white hover:duration-700 hover:shadow-lg">{uploading ? "Uploading..":"Upload"}</button>

                    </div>
                    <p className='className="text-red-700 font-semibold'>{imageUploaderror && imageUploaderror}</p>
                    <div></div>
                    {
                        fromdata.imageUrl.length > 0 && fromdata.imageUrl.map((url, index) => {
                            return (
                                <div key={url} className='flex justify-between p-3 border items-center' >
                                    <img src={url} alt='listing image' className='w-20 h-20 object-contain rounded-lg' />
                                    <button onClick={() => imageRemoveHandler(index)} type='button' className='p-3 text-red-700 rounded-lg uppercase hover:opacity-75'>Delete</button>
                                </div>
                            )
                        })
                    }
                    <button type='submit' disabled={loading} className="p-3 bg-slate-700 text-white rounded-lg uppercase hover:opacity-95">
                        {
                         loading? "creating.. ":"createlisting"
                        }
                        </button>
                        <p className="text-red-700 text-sm font-semibold text-center">{error}</p>
                </div>
            </form>
        </div>
    )
}
