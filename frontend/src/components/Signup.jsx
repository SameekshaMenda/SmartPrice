// frontend/src/components/Signup.jsx (Complete, Final Version)

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../firebase"; // Make sure this path is correct

export default function Signup() {
  const navigate = useNavigate();

  // --- 1. Create state for all form fields and errors ---
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignup = async (e) => {
    e.preventDefault();
    setError(''); // Clear previous errors
    setLoading(true);

    // --- 2. Add client-side validation before calling Firebase ---
    if (!fullName || !email || !password) {
      setLoading(false);
      return setError("All fields are required.");
    }
    if (password !== confirmPassword) {
      setLoading(false);
      return setError("Passwords do not match.");
    }
    if (password.length < 6) {
      setLoading(false);
      return setError("Password must be at least 6 characters long.");
    }

    try {
      // --- 3. Call Firebase to create the user ---
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      // Set the user's display name
      await updateProfile(userCredential.user, { displayName: fullName });
      
      setLoading(false);
      navigate("/welcome"); // Redirect on success
    } catch (err) {
      // --- 4. Handle specific Firebase errors ---
      setLoading(false);
      switch (err.code) {
        case 'auth/email-already-in-use':
          setError('This email address is already in use.');
          break;
        case 'auth/invalid-email':
          setError('Please enter a valid email address.');
          break;
        default:
          setError('Failed to create an account. Please try again.');
          break;
      }
      console.error("Firebase signup error:", err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white via-[#F0EAF8] to-white relative overflow-hidden px-4">
      <div className="absolute top-8 left-8 w-24 h-24 bg-[#C8ACD6] opacity-20 rounded-full"></div>
      <div className="absolute bottom-10 right-10 w-32 h-32 bg-[#17153B] opacity-10 rotate-45"></div>

      <div className="bg-white shadow-xl rounded-2xl w-full max-w-md p-8 z-10">
        <h2 className="text-3xl font-bold text-[#17153B] mb-6 text-center">Create Your Account</h2>

        <form className="flex flex-col gap-4" onSubmit={handleSignup}>
          {/* --- 5. Connect inputs to state and display errors --- */}
          <input
            type="text"
            placeholder="Full Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="p-3 rounded-lg border border-[#C8ACD6] focus:outline-none focus:ring-2 focus:ring-[#C8ACD6]"
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="p-3 rounded-lg border border-[#C8ACD6] focus:outline-none focus:ring-2 focus:ring-[#C8ACD6]"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="p-3 rounded-lg border border-[#C8ACD6] focus:outline-none focus:ring-2 focus:ring-[#C8ACD6]"
          />
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="p-3 rounded-lg border border-[#C8ACD6] focus:outline-none focus:ring-2 focus:ring-[#C8ACD6]"
          />

          {/* Display error message if it exists */}
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="bg-[#17153B] text-[#C8ACD6] py-3 rounded-lg font-semibold hover:bg-[#B19CC8] hover:text-[#17153B] transition duration-300 disabled:bg-gray-400"
          >
            {loading ? 'Creating Account...' : 'Sign Up'}
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-[#433D8B]">
          Already have an account?{" "}
          <Link to="/" className="text-[#C8ACD6] underline hover:text-[#B19CC8] transition">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}