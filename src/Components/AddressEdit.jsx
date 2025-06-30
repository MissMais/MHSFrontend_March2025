import axios from 'axios'
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'





export default function AddressEdit() {


    let params = useParams()
    let navigate = useNavigate()

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm()
    
 useEffect(()=>{
    getAdd(params.id)
 },[])

    const getAdd =async(id)=>{
        try {
            const Data = await axios.get('https://3j7gm770-8000.inc1.devtunnels.ms/address/?id='+ id)
            console.log(Data)

            reset({
                name:Data['data'][0]['Name'],
                contact:Data['data'][0]['Contact'],
                address_type:Data['data'][0]['Address_type'],
                house_no:Data['data'][0]['House_No'],
                area_colony:Data['data'][0]['Area_Colony'],
                landmark:Data['data'][0]['Landmark'],
                city:Data['data'][0]['City'],
                state:Data['data'][0]['State'],
                country:Data['data'][0]['Country'],
                pincode:Data['data'][0]['Pincode'],


                
            })

        } catch (error) {
            console.log(error)
        }
    }


    const saveData = async(data)=>{
        try {
            const Adddata = await axios.put('https://3j7gm770-8000.inc1.devtunnels.ms/filter/'+params.id +'/', data)
            console.log(params.id,data)
            reset()
            navigate('/Address')
        } catch (error) {
            console.log(error)
        }
    }


  return (
    <div className="flex justify-center  min-h-screen bg-white mt-20">
    <div className="w-full max-w-2xl bg-white shadow-lg p-6 rounded-lg m-6">
    
            <form onSubmit={handleSubmit(saveData)}>
                
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="mb-4">
                    <label htmlFor="Name" className="block font-bold  text-sm text-gray-700" style={{ fontFamily: 'Copperplate, Papyrus, fantasy', color: '#666F80' }}>Name</label>
                    <input
                        {...register('name', { required: true })}
                        type="text"
                        id="Name"
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#666F80]"
                    />
                </div>
                <div className='mb-4'>
              <label className="block font-bold  text-sm  text-gray-700" style={{ fontFamily: 'Copperplate, Papyrus, fantasy', color: '#666F80' }}>Contact</label>
              <input
                {...register("contact", { required: true })}
                 className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#666F80]"
                type="text"
                required
              />
            </div>
               <div className='mb-4'>
              <label className="block font-bold  text-gray-700" style={{ fontFamily: 'Copperplate, Papyrus, fantasy', color: '#666F80' }}>Address Type</label>
              <input
                {...register("address_type", { required: true })}
                 className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#666F80]"
                type="text"
                required
              />
            </div>

            <div className='mb-4'>
              <label className="block font-bold  text-gray-700" style={{ fontFamily: 'Copperplate, Papyrus, fantasy', color: '#666F80' }}>House No</label>
              <input
                {...register("house_no", { required: true })}
                 className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#666F80]"
                type="text"
                required
              />
            </div>
            <div className='mb-4'>
              <label className="block font-bold  text-gray-700" style={{ fontFamily: 'Copperplate, Papyrus, fantasy', color: '#666F80' }}>Area/Colony</label>
              <input
                {...register("area_colony", { required: true })}
                 className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#666F80]"
                type="text"
                required
              />
            </div>
            <div className='mb-4'>
              <label className="block font-bold  text-gray-700" style={{ fontFamily: 'Copperplate, Papyrus, fantasy', color: '#666F80' }}>Landmark</label>
              <input
                {...register("landmark", { required: true })}
                 className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#666F80]"
                type="text"
                required
              />
            </div>
            <div className='mb-4'>
              <label className="block font-bold  text-gray-700" style={{ fontFamily: 'Copperplate, Papyrus, fantasy', color: '#666F80' }}>City</label>
              <input
                {...register("city", { required: true })}
                 className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#666F80]"
                type="text"
                required
              />
            </div>
            <div className='mb-4'>
              <label className="block font-bold  text-gray-700" style={{ fontFamily: 'Copperplate, Papyrus, fantasy', color: '#666F80' }}>State</label>
              <input
                {...register("state", { required: true })}
                 className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#666F80]"
                type="text"
                required
              />
            </div>
            <div className='mb-4' >
              <label className="block font-bold  text-gray-700" style={{ fontFamily: 'Copperplate, Papyrus, fantasy', color: '#666F80' }}>Country</label>
              <input
                {...register("country", { required: true })}
                 className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#666F80]"
                type="text"
                required
              />
            </div>
            <div className='mb-4'>
              <label className="block font-bold  text-gray-700" style={{ fontFamily: 'Copperplate, Papyrus, fantasy', color: '#666F80' }}>Pincode</label>
              <input
                {...register("pincode", { required: true })}
                 className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#666F80]"
                type="text"
                required
              />
            </div>
                </div>
                <div className="flex space-x-4 mt-4">
                    <button type="submit" className="bg-[#FB6D6C] text-white py-2 px-4 rounded-md hover:bg-[#e95a59] focus:outline-none focus:ring-2 focus:ring-blue-500">
                        Submit
                    </button>
                    <button type="reset" className="bg-[#666F80] text-white py-2 px-4 rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-red-500">
                        Reset
                    </button>
                </div>
                
            </form>
            </div>
</div>
        
  )
}
