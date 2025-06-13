
// src/pages/Signup.jsx
import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';

// Validation schema
const schema = yup.object().shape({
  firstName: yup.string().required('First name is required').matches(/^[A-Za-z]+$/, 'Must contain at least only letters'),
  lastName: yup.string().required('Last name is required').matches(/^[A-Za-z]+$/, 'Must contain at least only letters'),
  email: yup.string().email('Invalid email').required('Email is required'),
  phone: yup
    .string()
    .matches(/^[6-9]\d{9}$/, 'Enter a valid 10-digit Indian phone number')
    .required('Phone number is required'),
  password: yup
    .string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters')
    .matches(/[A-Z]/, 'Must contain at least one uppercase letter')
    .matches(/[a-z]/, 'Must contain at least one lowercase letter')
    .matches(/[0-9]/, 'Must contain at least one number')
    .matches(/[!@#$%^&*]/, 'Must contain at least one special character'),

});

export default function Signup() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });
    const navigate = useNavigate();

  // const onSubmit = (data) => {
  //   console.log(data);
  //   alert('Signup successful!');
  //   reset();
  // };
  const onSubmit = async (data) => {
    const apiUrl = import.meta.env.VITE_API_URL;
    console.log("🌐 Backend URL:", import.meta.env.VITE_API_URL);

    try {
      const response = await fetch(`${apiUrl}/api/auth/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      console.log("📦 Response from backend:", result);

      if (response.ok) {
        alert('Signup successful!');
        reset();
        navigate("/login"); // redirect to landing page
      } else {
        alert(`Error: ${result.message}`);
      }
    } catch (error) {
      console.error('❌ Fetch error:', error);
      alert('Something went wrong!');
    }
};



  return (
    <div className="flex justify-center items-center min-h-screen w-screen bg-gradient-to-r from-green-100 to-green-300">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6 text-green-600">Sign Up</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-semibold mb-1">First Name</label>
            <input {...register('firstName')} className="w-full p-2 border rounded" />
            <p className="text-red-500 text-sm">{errors.firstName?.message}</p>
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-1">Last Name</label>
            <input {...register('lastName')} className="w-full p-2 border rounded" />
            <p className="text-red-500 text-sm">{errors.lastName?.message}</p>
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-1">Email</label>
            <input {...register('email')} className="w-full p-2 border rounded" />
            <p className="text-red-500 text-sm">{errors.email?.message}</p>
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-1">Phone Number</label>
            <input {...register('phone')} className="w-full p-2 border rounded" />
            <p className="text-red-500 text-sm">{errors.phone?.message}</p>
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-1">Password</label>
            <input type="password" {...register('password')} className="w-full p-2 border rounded" />
            <p className="text-red-500 text-sm">{errors.password?.message}</p>
          </div>

          <button
            type="submit"
            className="w-full bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded transition"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}
