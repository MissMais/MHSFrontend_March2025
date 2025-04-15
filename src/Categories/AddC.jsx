// import React, { useEffect, useState } from 'react'
// // import { useNavigate } from 'react-router'
// import { useForm } from 'react-hook-form'
// import axios from 'axios';
// import 'bootstrap/dist/css/bootstrap.min.css';


// export default function AddSC() {
//     const [data, setdata] = useState([]);
//     // const [formData, setFormData] = useState({
//     //     category_id: '',
//     //     category_name: '',
//     //     category_image: '',
    
//     //   });

//     const {
//         register,
//         handleSubmit,
//         reset,
//         formState: {errors}
//     } = useForm()




//     useEffect(() => {
//         getData();
//       }, []);




//     const getData = async(data)=>{
//         try {
//             const response = await axios.get('https://modestgallery.pythonanywhere.com/category/');
//       console.log([response.data]);
            
//         } catch (error) {
//             console.log(error)
//         }
//     }

//     const saveData = async(data)=>{
//         try {

//             const formData = new FormData();
//             // console.log(key)
        
      
//             Object.keys(data).forEach((key) => {
//               if (key === "category_image") {
      
//                 formData.append(key, data[key][0]);
//               } else {
//                 formData.append(key, data[key]);
//               }
//             });

//             const SC1data = await axios.post('https://modestgallery.pythonanywhere.com/category/',formData,{ headers: {
//                 "Content-type": "multipart/form-data",
//               }
//             })
//             console.log(SC1data)
//             console.log("SubCategory added")
//             reset()
        
         
//         } catch (error) {
//             console.log(error)
//         }
//     }
    
//     const onSubmit = (data) => {

//         saveData(data);
    
//     };

// return (

//         <div className='container'>
            
//             <form onSubmit={handleSubmit(onSubmit)}>
//                 <div className='form-group'>
//                     <label htmlFor="category_id">Category ID</label>
//                     <input {...register('category_id')}type="text" id='category_id' className='form-control'/>
//                 </div>
//                 <div className='form-group'>
//                     <label htmlFor="category_name">Category Name</label>
//                     <input {...register('category_name')} type="text" id='category_name' className='form-control'/>
//                 </div>
//                 <div className='form-group'>
//                     <label htmlFor="category_image">Category Image</label>
//                     <input {...register('category_image')} type="file" id='category_image' className='form-control'/>
//                 </div>

//                 <div className='btn btn-group'>
//                     <button type='submit' className='btn btn-primary'>
//                         Submit
//                         </button>
//                     <button type='reset'  className='btn btn-danger'>
//                         Reset
//                     </button>
//                 </div>
//             </form>
//         </div>
//     )
    
    
//     }




import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function AddSC() {
  const Navigate = useNavigate()
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const saveData = async (data) => {
    try {
    

      const payload = {
        id: data.id,
        Category_name: data.Category_name,
      };

      const response = await axios.post('https://qr723wq6-8000.inc1.devtunnels.ms/cat/', payload, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      console.log('Category added:', response.data);
      reset();
      Navigate('/allC')
    } catch (error) {
      console.error('Error saving data:', error);
    }
  };

  return (
    <div className="container mt-4">
        <form onSubmit={handleSubmit(saveData)}>

            <div className="mb-4">
                <label htmlFor="Category_name" className="block text-sm font-medium text-gray-700">Category Name</label>
                <input
                    {...register('Category_name', { required: true })}
                    type="text"
                    id="Category_name"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.Category_name && <p className="text-red-500 text-sm">Category Name is required</p>}
            </div>

            <div className="flex space-x-4 mt-4">
                <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
                    Submit
                </button>
                <button type="reset" className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500" onClick={() => reset()}>
                    Reset
                </button>
            </div>

        </form>
    </div>
)
}