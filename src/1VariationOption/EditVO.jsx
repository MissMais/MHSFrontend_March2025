// import axios from 'axios'
// import React, { useEffect } from 'react'
// import { useForm } from 'react-hook-form'
// import { useNavigate, useParams } from 'react-router-dom'

// export default function EditVO() {


//     let params = useParams()
//     let navigate = useNavigate()

//     const {
//         register,
//         handleSubmit,
//         reset,
//         formState: { errors }
//     } = useForm()


//     useEffect(() => {
//         getVariationOption(params.id)
//     }, [])


//     const getVariationOption = async (id) => {
//         try {
//             const data = await axios.get(`http://localhost:2000/VariationOption/` + id)
//             // console.log(data)

//             reset({
//                 option_id: data.data.option_id,
//                 variation_id: data.data.variation_id,
//                 value: data.data.value,
//                 color_code: data.data.color_code,
                
//             })


//         } catch (error) {
//             console.log(error)

//         }
//     }



//     const saveData = async (data) => {
//         try {
//             const addVariationOption = await axios.patch('http://localhost:2000/VariationOption/' + params.id, data)
//             reset()
//             navigate("/allvo")

//         } catch (error) {
//             console.log(error)
//         }
//     }


//     return (

//         <div className="container mt-4">
//         <form onSubmit={handleSubmit(saveData)}>

//             <div className="form-group">
//                 <label htmlFor="option_id">option_id</label>
//                 <input
//                     {...register('option_id', { required: true })}
//                     type="text"
//                     id="option_id"
//                     className="form-control"
//                 />
//                 {errors.category_id && <p className="text-danger">option_id is required</p>}
//             </div>

//             <div className="form-group">
//                 <label htmlFor="variation_id">variation_id</label>
//                 <input
//                     {...register('variation_id', { required: true })}
//                     type="text"
//                     id="variation_id"
//                     className="form-control"
//                 />
//                 {errors.category && <p className="text-danger">variation_id is required</p>}
//             </div>

//             <div className="form-group">
//                 <label htmlFor="value">value</label>
//                 <input
//                     {...register('value', { required: true })}
//                     type="text"
//                     id="value"
//                     className="form-control"
//                 />
//                 {errors.category && <p className="text-danger">value is required</p>}
//             </div>

//             <div className="form-group">
//                 <label htmlFor="color_code">color_code</label>
//                 <input
//                     {...register('color_code', { required: true })}
//                     type="text"
//                     id="color_code"
//                     className="form-control"
//                 />
//                 {errors.category && <p className="text-danger">color_code is required</p>}
//             </div>


//             <div className="btn btn-group mt-3">
//                 <button type="submit" className="btn btn-primary">
//                     Submit
//                 </button>
//                 <button type="reset" className="btn btn-danger" onClick={() => reset()}>
//                     Reset
//                 </button>
//             </div>
//         </form>
//     </div>
//     )
// }


