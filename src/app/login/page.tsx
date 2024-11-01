import { login, signup } from "./actions";
import Nav from "@/components/nav";
export default function LoginPage() {
  return (
    <>
      <Nav />
      <form className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4 text-center">Welcome Back!</h2>

        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email:
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div className="mb-6">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Password:
          </label>
          <input
            id="password"
            name="password"
            type="password"
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div className="flex justify-between">
          <button
            type="submit"
            formAction={login}
            className="w-1/2 bg-indigo-600 text-white rounded-md p-2 hover:bg-indigo-700 transition duration-200"
          >
            Log In
          </button>
          <button
            formAction={signup}
            className="w-1/2 ml-2 bg-gray-300 text-gray-700 rounded-md p-2 hover:bg-gray-400 transition duration-200"
          >
            Sign Up
          </button>
        </div>
      </form>
    </>
  );
}
