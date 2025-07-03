function Signin() {
  return (
    <div className="flex h-screen">
      {/* Left Side - Signin Form with Background */}
      <div className="w-1/2 bg-gradient-to-br from-primary to-secondary flex justify-center items-center">
        <div className="w-[350px]">
          <h2 className="text-4xl font-bold text-cream mb-8 text-center">Sign In</h2>
          <form className="flex flex-col gap-5">
            <input
              type="email"
              placeholder="Email"
              className="p-3 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <input
              type="password"
              placeholder="Password"
              className="p-3 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <button
              type="submit"
              className="bg-accent text-white py-3 rounded-lg font-semibold hover:bg-yellow-400 transition duration-300"
            >
              Sign In
            </button>
          </form>
          <p className="mt-4 text-center text-sm text-cream">
            Don’t have an account? <span className="underline cursor-pointer">Register</span>
          </p>
        </div>
      </div>

      {/* Right Side - White Background */}
      <div className="w-1/2 bg-white flex justify-center items-center">
        <h1 className="text-5xl font-bold text-primary">SmartPrice</h1>
      </div>
    </div>
  );
}

export default Signin;
