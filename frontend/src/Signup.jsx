import { Link, useNavigate } from "react-router-dom";

export default function Signup() {
  const navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault();
    // Add your signup logic here
    navigate("/welcome");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white via-[#F0EAF8] to-white relative overflow-hidden px-4">
      {/* Decorative Abstract Shapes */}
      <div className="absolute top-8 left-8 w-24 h-24 bg-[#C8ACD6] opacity-20 rounded-full"></div>
      <div className="absolute bottom-10 right-10 w-32 h-32 bg-[#17153B] opacity-10 rotate-45"></div>

      {/* Form Container */}
      <div className="bg-white shadow-xl rounded-2xl w-full max-w-md p-8 z-10">
        <h2 className="text-3xl font-bold text-[#17153B] mb-6 text-center">Create Your Account</h2>

        <form className="flex flex-col gap-4" onSubmit={handleSignup}>
          <input
            type="text"
            placeholder="Full Name"
            className="p-3 rounded-lg border border-[#C8ACD6] focus:outline-none focus:ring-2 focus:ring-[#C8ACD6]"
          />
          <input
            type="email"
            placeholder="Email"
            className="p-3 rounded-lg border border-[#C8ACD6] focus:outline-none focus:ring-2 focus:ring-[#C8ACD6]"
          />
          <input
            type="password"
            placeholder="Password"
            className="p-3 rounded-lg border border-[#C8ACD6] focus:outline-none focus:ring-2 focus:ring-[#C8ACD6]"
          />
          <input
            type="password"
            placeholder="Confirm Password"
            className="p-3 rounded-lg border border-[#C8ACD6] focus:outline-none focus:ring-2 focus:ring-[#C8ACD6]"
          />

          <button
            type="submit"
            className="bg-[#17153B] text-[#C8ACD6] py-3 rounded-lg font-semibold hover:bg-[#B19CC8] hover:text-[#17153B] transition duration-300"
          >
            Sign Up
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
