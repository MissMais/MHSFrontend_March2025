import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Variation = () => {
  const [variations, setVariations] = useState([]);
  const [variationName, setVariationName] = useState('');
  const [editId, setEditId] = useState(null);

  const fetchVariations = async () => {
    const res = await axios.get('http://localhost:3001/variations'); 
    setVariations(res.data);
  };

  useEffect(() => {
    fetchVariations();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editId) {
      await axios.put(`http://localhost:3001/variations/${editId}`, { variation_name: variationName });
    } else {
      await axios.post('http://localhost:3001/variations/', { variation_name: variationName });
    }
    setVariationName('');
    setEditId(null);
    fetchVariations();
  };

  const handleEdit = (v) => {
    setVariationName(v.variation_name);
    setEditId(v.id);
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:3001/variations/${id}`);
    fetchVariations();
  };
  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Variations</h2>
      <form onSubmit={handleSubmit} className="flex gap-2 mb-4"> 
        <input
          className="border p-2 rounded"
          value={variationName}
          onChange={(e) => setVariationName(e.target.value)}
          placeholder="Variation Name"/>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          {editId ? 'Update' : 'Add'}
        </button>
      </form>

      <div className="grid gap-4">
        {variations.map((v) => (
          <div key={v.id} className="flex justify-between items-center border p-4 rounded">
            <div>{v.variation_name}</div>
            <div className="flex gap-2">
              <button
                onClick={() => handleEdit(v)}
                className="bg-yellow-400 text-white px-2 py-1 rounded">
                Edit
              </button>
              <button
                onClick={() => handleDelete(v.id)}
                className="bg-red-500 text-white px-2 py-1 rounded">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Variation;
