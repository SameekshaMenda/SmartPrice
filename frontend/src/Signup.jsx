import { Link, useNavigate } from "react-router-dom";

function Signup() {
  const navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault();
    // Add your signup logic here
    navigate("/welcome"); // Navigate to Welcome page
  };

  return (
    <div className="h-screen w-screen flex justify-center items-center bg-gradient-to-br from-primary to-secondary">
      <div className="bg-white shadow-lg rounded-xl w-[400px] p-8">
        <h2 className="text-3xl font-bold text-primary mb-6 text-center">Sign Up</h2>
        <form className="flex flex-col gap-4" onSubmit={handleSignup}>
          <input
            type="text"
            placeholder="Full Name"
            className="p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <input
            type="email"
            placeholder="Email"
            className="p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <input
            type="password"
            placeholder="Password"
            className="p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <input
            type="password"
            placeholder="Confirm Password"
            className="p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <button
            type="submit"
            className="bg-accent text-white py-3 rounded-lg font-semibold hover:bg-yellow-400 transition duration-300"
          >
            Sign Up
          </button>
        </form>
        <p className="mt-4 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link to="/" className="text-primary underline cursor-pointer">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;
