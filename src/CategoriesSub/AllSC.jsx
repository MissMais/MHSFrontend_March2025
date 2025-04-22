// import React, { useEffect, useState } from 'react'
// import axios from 'axios'
// import 'bootstrap/dist/css/bootstrap.min.css';
// import { useNavigate } from 'react-router';


// export default function AllSC() {
//     const [SC, setSC] = useState([])
//     const [search, setsearch] = useState(null)
//     const Navigate = useNavigate();



//     useEffect(() => {
//         fetchSC()
//     }, [])



//     const editSC = async (id) => {
//         console.log(id)
//         Navigate('/editSC/' + id)
//     }





//     const fetchSC = async () => {
//         try {
//             const response = await axios.get('https://3rn4qfbv-8000.inc1.devtunnels.ms/subcat')
//             console.log(response.data)
//             setSC(response.data)
//         }
//         catch (error) {
//             console.log(error)
//         }

//     }





//     const ButtonDelete = async (id) => {
//         try {
//             await axios.delete(`https://3rn4qfbv-8000.inc1.devtunnels.ms/subcat/${id}`)
//             setSC(SC.filter(SC => SC.id !== id))
//         } catch (error) {
//             console.log(error)
//         }
//     }

//     const handlechange = async (e) => {
//         setsearch(e.target.value)

//     }
//     const FilteredSC = SC.filter(sc => sc.Sub_Category_name.toLowerCase().includes(search.toLowerCase()))


//    const AddNavigate=()=>{
//     Navigate('/addSC')
//    }



//     return (
//         <div className='container mt-4'>

//             <div className='text-center fw-bold '>SUBCATEGORIES</div>

//             <div className="input-group mb-3">
//                 <input
//                     type="text"
//                     className="form-control"
//                     onChange={handlechange}
//                     placeholder="Search By Name"
//                     aria-label="Search By Name"
//                 />
//                 <button className="btn btn-primary" type="button" onClick={AddNavigate}>
//                     Add SubCategory
//                 </button>
//             </div>


//             <div className='card-body'>
//                 <ul className='list-group'>
//                     {FilteredSC.map((sc) => (
//                         <li key={sc.id} className='list-group-item d-flex justify-content-between align-items-center'>
//                             <div>
//                                 <strong>sub_category_id: </strong>{sc.id}<br />
//                                 <strong> sub_category_name: </strong>{sc.Sub_Category_name} <br />
//                                 <strong>category: </strong>{sc.Category}
//                             </div>
//                             <div>
//                                 <button className='btn btn-primary btn-sm' onClick={() => ButtonDelete(sc.id)}>DELETE</button>
//                                 <button className='btn btn-success btn-sm ms-3' onClick={() => editSC(sc.id)}>EDIT</button>
//                             </div>
//                         </li>
//                     ))}

//                 </ul>
//             </div>

//         </div>
//     )
// }



import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';

export default function AllSC() {
  const [SC, setSC] = useState([]); // State to store subcategories
  const [search, setSearch] = useState(""); // State for the search input
  const navigate = useNavigate();
  const [img, setimg] = useState([])
  // Fetch data on component mount
  useEffect(() => {
    fetchSC();
  }, []);

  // Function to fetch subcategory data
  const fetchSC = async () => {
    try {
      const response = await axios.get('https://3rn4qfbv-8000.inc1.devtunnels.ms/subcat');
      setSC(response.data); // Store the fetched data in state

      const response2 = await axios.get('https://3rn4qfbv-8000.inc1.devtunnels.ms/images/')
      setimg(response2.data)
      console.log(response2
        
      )


    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Search handler
  const handleSearch = (e) => {
    setSearch(e.target.value); // Update search state
  };

  // Filtered subcategories based on search
  const filteredSC = SC.filter((sc) =>
    sc.Sub_Category_Name?.toLowerCase().includes(search.toLowerCase())
  );

  // Navigate to Add Subcategory page
  const addNavigate = () => {
    navigate('/addSC');
  };

  // Delete a subcategory
  const buttonDelete = async (id) => {
    try {
      await axios.delete(`https://3rn4qfbv-8000.inc1.devtunnels.ms/subcat/${id}`);
      setSC(SC.filter((sc) => sc.id !== id)); // Remove deleted subcategory from state
    } catch (error) {
      console.error("Error deleting subcategory:", error);
    }
  };

  // Edit a subcategory
  const editSC = (id) => {
    navigate(`/editSC/${id}`);
  };
  return (
    <div className="container mt-4">

<div>
  {img.map((i) => (
    <img 
      key={i.id} 
      src={`data:image/jpeg;base64,${i.img_path}`} 
      alt="Image" 
    />
  ))}
</div>
  




      <div className="text-center font-bold text-xl mb-4">SUBCATEGORIES</div>

      {/* Search input and Add button in one line */}
      <div className="flex items-center gap-3 mb-4">
        <input
          type="text"
          className="form-control py-1 px-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-1/2 sm:w-auto"
          onChange={handleSearch}
          placeholder="Search By Name"
          aria-label="Search By Name"
        />
        <button
          className="bg-blue-500 text-white py-1 px-3 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="button"
          onClick={addNavigate}
        >
          Add SubCategory
        </button>
      </div>

      {/* Show filtered results */}
      {filteredSC.length > 0 ? (
        <div className="bg-white p-4 rounded-lg shadow-md">
          <ul className="space-y-4">
            {filteredSC.map((sc) => (
              <li key={sc.id} className="flex justify-between items-center p-3 border-b border-gray-200">
                <div>
                  <strong>sub_category_id: </strong>{sc.id}<br />
                  <strong>sub_category_name: </strong>{sc.Sub_Category_Name}<br />
                  <strong>category: </strong>{sc.Category?.Category_name}
                </div>
                <div className="flex space-x-3">
                  <button
                    className="bg-blue-500 text-white text-xs py-1 px-3 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    onClick={() => buttonDelete(sc.id)}
                  >
                    DELETE
                  </button>
                  <button
                    className="bg-green-500 text-white text-xs py-1 px-3 rounded hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
                    onClick={() => editSC(sc.id)}
                  >
                    EDIT
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        // If no results, show this message
        <div className="alert alert-warning text-center p-4 bg-yellow-100 text-yellow-700 rounded-md">
          No Subcategories Found!
        </div>
      )}
    </div>
  )
}