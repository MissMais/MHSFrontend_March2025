// import React from 'react';
// import { useForm } from 'react-hook-form';
// import axios from 'axios';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import { Navigate, useNavigate } from 'react-router-dom';

// export default function AddVO() {
//     const Navigate = useNavigate()
//     const {
//         register,
//         handleSubmit,
//         reset,
//         formState: { errors },
//     } = useForm();

//     const saveData = async (data) => {
//         try {
//             const payload = {
//                 option_id: data.option_id,
//                 variation_id: data.variation_id,
//                 value: data.value,
//                 color_code: data.color_code,
                
//             };

//             const response = await axios.post('http://localhost:2000/VariationOption', payload, {
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//             });

//             console.log('Options added:', response.data);
//             reset();
//             Navigate('/allvo')
//         } catch (error) {
//             console.error('Error saving data:', error);
//         }
//     };

//     return (
//         <div className="container mt-4">
//             <form onSubmit={handleSubmit(saveData)}>

//                 <div className="form-group">
//                     <label htmlFor="option_id">option_id</label>
//                     <input
//                         {...register('option_id', { required: true })}
//                         type="text"
//                         id="option_id"
//                         className="form-control"
//                     />
//                     {errors.category_id && <p className="text-danger">option_id is required</p>}
//                 </div>

//                 <div className="form-group">
//                     <label htmlFor="variation_id">variation_id</label>
//                     <input
//                         {...register('variation_id', { required: true })}
//                         type="text"
//                         id="variation_id"
//                         className="form-control"
//                     />
//                     {errors.category && <p className="text-danger">variation_id is required</p>}
//                 </div>

//                 <div className="form-group">
//                     <label htmlFor="value">value</label>
//                     <input
//                         {...register('value', { required: true })}
//                         type="text"
//                         id="value"
//                         className="form-control"
//                     />
//                     {errors.category && <p className="text-danger">value is required</p>}
//                 </div>

//                 <div className="form-group">
//                     <label htmlFor="color_code">color_code</label>
//                     <input
//                         {...register('color_code', { required: true })}
//                         type="text"
//                         id="color_code"
//                         className="form-control"
//                     />
//                     {errors.category && <p className="text-danger">color_code is required</p>}
//                 </div>


//                 <div className="btn btn-group mt-3">
//                     <button type="submit" className="btn btn-primary">
//                         Submit
//                     </button>
//                     <button type="reset" className="btn btn-danger" onClick={() => reset()}>
//                         Reset
//                     </button>
//                 </div>
//             </form>
//         </div>
//     );
// }

