import React from "react";

const Signup = () => {
    return (
        <div>
            
          <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
                <h2 className="text-2xl font-semibold text-center mb-4">Create an Account</h2>
                <form>
                    <div className="mb-4">
                        <label htmlFor="signupName" className="block text-gray-700 font-medium">Name</label>
                        <input type="text" id="signupName" className="w-full px-4 py-2 border rounded-lg " placeholder="Enter your full name" required />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="signupEmail" className="block text-gray-700 font-medium">Email address</label>
                        <input type="email" id="signupEmail" className="w-full px-4 py-2 border rounded-lg  " placeholder="Enter your email" required />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="signupPassword" className="block text-gray-700 font-medium">Password</label>
                        <input type="password" id="signupPassword" className="w-full px-4 py-2 border rounded-lg   " placeholder="Create a password" required />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="signupConfirmPassword" className="block text-gray-700 font-medium">Confirm Password</label>
                        <input type="password" id="signupConfirmPassword" className="w-full px-4 py-2 border rounded-lg   " placeholder="Confirm your password" required />
                    </div>
                    <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition">Sign Up</button>
                    <p className="mt-3 text-center text-gray-600">Already have an account? <a href="/login" className="text-blue-500 hover:underline">Login</a></p>
                </form>
            </div>
        </div>
        </div>
        
    );
};

export default Signup;
