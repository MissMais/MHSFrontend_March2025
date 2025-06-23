import React from 'react';
import { useForm } from 'react-hook-form';

export default function AccountEdit() {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    
  };
 
  const inputclass = "w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
  return (
    <div className="min-h-screen bg-gray-50 p-6 flex justify-center mt-20">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-xl bg-white p-8 rounded shadow-md"
      >
        <h2 className="text-2xl font-bold mb-6">Account Details</h2>

        <div className="space-y-4 grid grid-col-1 md:grid-col-2 gap-4">
          <input {...register('email')} type="email" placeholder="Email" className={inputclass} />
          <input {...register('password')} type="password" placeholder="Password" className={inputclass} />
          <input {...register('phone')} type="tel" placeholder="Phone Number" className={inputclass} />
        
        </div>

        <h2 className="text-2xl font-bold mt-8 mb-6">Location</h2>

        <div className="space-y-4">
          <input {...register('country')} type="text" placeholder="Country" className={inputclass} />
          <input {...register('state')} type="text" placeholder="State" className={inputclass} />
          <input {...register('city')} type="text" placeholder="City" className={inputclass} />
          
        </div>

        <div className="mt-8 flex items-center justify-between">
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            Add 
          </button>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            Edit 
          </button>
        </div>
      </form>
    </div>
  );
}
