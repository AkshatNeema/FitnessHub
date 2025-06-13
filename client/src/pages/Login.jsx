
import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router-dom';

import * as yup from 'yup';

const loginSchema = yup.object().shape({
  email: yup.string().email('Enter a valid email').required('Email is required'),
  password: yup.string().required('Password is required'),
});


export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(loginSchema),
  });
  const navigate = useNavigate();

  // const onSubmit = (data) => {
  //   console.log(data);
  //   alert('Login successful!');
  //   reset();
  // };
  const onSubmit = async (data) => {
    const apiUrl = import.meta.env.VITE_API_URL;

    try {
      const response = await fetch(`${apiUrl}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        // After successful login
        localStorage.setItem("user", JSON.stringify(result.user)); // assume backend sends user object
        alert("Login successful!");
        navigate("/"); // redirect to landing page
        window.location.reload(); //refreshs the page
        reset();
      } else {
        alert(`Error: ${result.message}`);
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('Something went wrong!');
    }

};

  return (
    <div className="flex justify-center items-center min-h-screen w-screen bg-gradient-to-r from-green-100 to-green-300">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6 text-green-600">Login</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-semibold mb-1">Email</label>
            <input {...register('email')} className="w-full p-2 border rounded" />
            <p className="text-red-500 text-sm">{errors.email?.message}</p>
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
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
