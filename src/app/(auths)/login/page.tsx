"use client";
import { useState } from "react";
import { login, signup } from "./actions";
import Nav from "@/components/nav";
import Image from "next/image";

export default function LoginPage() {
  const [inp, setInp] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [error, setError] = useState<string>("");

  async function handleSignup() {
    if (inp.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    } else if (!email.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }
    setError("");

    // Create a FormData object manually
    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", inp);

    // Call signup action
    await signup(formData);
  }

  async function handleLogin() {
    if (inp.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    } else if (!email.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }
    setError("");

    // Create a FormData object manually
    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", inp);

    // Call login action
    await login(formData);
  }

  return (
    <>
      <Nav />
      <main className="flex justify-center h-screen p-[12em]">
        <article className="h-full w-[40%] border-x-2 rounded-lg border-slate-800">
          <form // form????
            className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md"
            onSubmit={(e) => e.preventDefault()} //prevent default form submit
          >
            <h2 className="text-2xl font-bold mb-4 text-center">
              Welcome Back!
            </h2>

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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                value={inp}
                onChange={(e) => setInp(e.target.value)}
                id="password"
                name="password"
                type="password"
                required
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {error && <p className="text-red-600 mb-4">{error}</p>}

            <div className="flex justify-between">
              <button
                type="button"
                onClick={handleLogin}
                className="w-1/2 bg-indigo-600 text-white rounded-md p-2 hover:bg-indigo-700 transition duration-200"
              >
                Log In
              </button>
              <button
                type="button"
                onClick={handleSignup}
                className="w-1/2 ml-2 bg-gray-300 text-gray-700 rounded-md p-2 hover:bg-gray-400 transition duration-200"
              >
                Sign Up
              </button>
            </div>
          </form>
        </article>
        <article className="block space-y-4 h-[100%] w-[80%]">
          <Image
            src={"/password.svg"}
            alt="login sticker"
            width={0}
            height={0}
            style={{ width: "100%" }}
            className="h-[90%]"
            priority={false}
          />
          <h5 className="text-center font-bold">
            "Being a student or young doesn't mean you know nothing. <br />{" "}
            Speak up and let your voice be heard!"
          </h5>
        </article>
      </main>
    </>
  );
}
