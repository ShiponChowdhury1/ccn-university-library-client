import { useRegister } from "./useRegister";

const Register = () => {
  const {
    name,
    setName,
    email,
    setEmail,
    password,
    setPassword,
    loading,
    error,
    success,
    handleRegister,
  } = useRegister();

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-100 to-indigo-200">
      <form onSubmit={handleRegister} className="w-full max-w-md space-y-4 bg-white p-8 rounded-xl shadow-xl border text-black">
        <h1 className="text-3xl font-bold text-center text-indigo-700">Register</h1>
        {error && <p className="text-red-600 text-center">{error}</p>}
        {success && <p className="text-green-600 text-center">{success}</p>}
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          placeholder="Name"
          className="p-3 border rounded w-full"
        />
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          placeholder="Email"
          className="p-3 border rounded w-full"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          placeholder="Password"
          className="p-3 border rounded w-full"
        />
        <div>
        
        </div>
        <button
          disabled={loading}
          type="submit"
          className="w-full bg-indigo-600 text-white py-3 rounded font-bold"
        >
          {loading ? "Registering..." : "Register"}
        </button>
      </form>
    </div>
  );
};

export default Register;
