
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';

export default function VariationOptionCRUD() {
    const [voList, setVoList] = useState([]);
    const [editId, setEditId] = useState(null);
    const { register, handleSubmit, reset, setValue } = useForm();

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const res = await axios.get('http://localhost:2000/VariationOption');
            setVoList(res.data);
        } catch (err) {
            console.log(err);
        }
    };

    const onSubmit = async (data) => {
        try {
            if (editId === null) {
                await axios.post('http://localhost:2000/VariationOption', data);
            } else {
                await axios.patch(`http://localhost:2000/VariationOption/${editId}`, data);
            }
            reset();
            setEditId(null);
            fetchData();
        } catch (err) {
            console.log(err);
        }
    };

    const editItem = (item) => {
        setEditId(item.id);
        setValue('option_id', item.option_id);
        setValue('variation_id', item.variation_id);
        setValue('value', item.value);
        setValue('color_code', item.color_code);
    };

    const deleteItem = async (id) => {
        try {
            await axios.delete(`http://localhost:2000/VariationOption/${id}`);
            fetchData();
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="container mt-4">
          <h2>{editId ? 'Edit' : 'Add'} Variation Option</h2>
      
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              <label className="block text-sm font-semibold text-gray-700">Option ID</label>
              <input
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                {...register('option_id', { required: true })}
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-semibold text-gray-700">Variation ID</label>
              <input
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                {...register('variation_id', { required: true })}
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-semibold text-gray-700">Value</label>
              <input
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                {...register('value', { required: true })}
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-semibold text-gray-700">Color Code</label>
              <input
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                {...register('color_code', { required: true })}
              />
            </div>
            <div className="mt-3 flex items-center">
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                type="submit"
              >
                {editId ? 'Update' : 'Add'}
              </button>
              <button
                className="bg-gray-500 text-white px-4 py-2 rounded-md ml-2 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500"
                type="button"
                onClick={() => {
                  reset();
                  setEditId(null);
                }}
              >
                Clear
              </button>
            </div>
          </form>
      
          <hr className="my-6" />
      
          <h2>All Variation Options</h2>
          <ul className="space-y-2">
            {voList.map((item) => (
              <li
                key={item.id}
                className="flex justify-between items-center p-4 bg-white border border-gray-300 rounded-lg shadow-sm"
              >
                <div>
                  <div>Option ID: {item.option_id}</div>
                  <div>Variation ID: {item.variation_id}</div>
                  <div>Value: {item.value}</div>
                  <div>Color Code: {item.color_code}</div>
                </div>
                <div>
                  <button
                    className="bg-green-500 text-white px-3 py-1 rounded-md text-sm hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
                    onClick={() => editItem(item)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-500 text-white px-3 py-1 rounded-md text-sm ml-2 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                    onClick={() => deleteItem(item.id)}
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      );
      
}
