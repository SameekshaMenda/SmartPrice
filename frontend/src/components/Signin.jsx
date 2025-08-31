// frontend/src/components/Signin.js

import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';

export default function Signin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/welcome');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white via-[#F3EFF9] to-white relative overflow-hidden px-4">
      {/* Decorative Borders */}
      <div className="absolute top-8 right-8 w-20 h-20 bg-[#C8ACD6] opacity-20 rounded-lg rotate-12"></div>
      <div className="absolute bottom-8 left-8 w-24 h-24 bg-[#17153B] opacity-10 rotate-45"></div>

      {/* Sign-in Form */}
      <div className="bg-white shadow-2xl rounded-2xl w-full max-w-md p-8 z-10">
        <h2 className="text-3xl font-bold text-[#17153B] mb-6 text-center">Welcome Back</h2>

        <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            required
            className="p-3 rounded-lg border border-[#C8ACD6] focus:outline-none focus:ring-2 focus:ring-[#C8ACD6]"
          />
          <input
            type="password"
            placeholder="Password"
            required
            className="p-3 rounded-lg border border-[#C8ACD6] focus:outline-none focus:ring-2 focus:ring-[#C8ACD6]"
          />

          <button
            type="submit"
            className="bg-[#17153B] text-[#C8ACD6] py-3 rounded-lg font-semibold hover:bg-[#B19CC8] hover:text-[#17153B] transition duration-300"
          >
            Sign In
          </button>
        </form>

        <p className="mt-5 text-center text-sm text-[#433D8B]">
          New here?{" "}
          <Link to="/signup" className="text-[#C8ACD6] underline hover:text-[#B19CC8] transition">
            Create an Account
          </Link>
        </p>
      </div>
    </div>
  );
}
