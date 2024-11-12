"use client";
import { useState } from "react";
import { login } from "./actions";
import Nav from "@/components/nav";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
export default function LoginPage() {
  //
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [password, setPassword] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [error, setError] = useState<string>("");

  //
  // handle loginsszzz
  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    if (!password || !email) {
      setError("All fields are required to fill in.");
      return null;
    } else if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return null;
    } else if (!email.includes("@")) {
      setError("Please enter a valid email address.");
      return null;
    }
    setError("");
    setLoading(true);

    // Create a FormData object manually
    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);

    try {
      const result = await login(formData);

      if (!result.success) {
        setError(result.status);
      } else {
        setError("");
        router.push("/home");
      }
    } catch (e) {
      console.error(e);
      setError("Login failed. Please check your credentials and try again.");
      alert(`An error has occured: ${e}`);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Nav />
      <main className="flex justify-center h-screen p-[12em] max-sm:p-[6em] bg-gradient-to-tl from-black from-15% via-slate-700 via-40% to-slate-400 to-65%">
        <article className="h-full w-[40%] max-sm:border-none max-sm: max-xl:w-[80%] max-md:w-[100vh] border-x-2 rounded-lg border-slate-800">
          <form // form????
            className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md"
            onSubmit={handleLogin}
          >
            <h2 className="text-2xl font-bold mb-4 text-center dark:text-black">
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                id="password"
                name="password"
                type="password"
                required
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {error && <p className="text-red-600 mb-4">{error}</p>}

            <div className="flex justify-between max-sm:justify-center max-sm:items-center max-sm:flex-col">
              <button
                type="submit"
                disabled={loading}
                className="w-1/2 max-sm:w-1/2 max-sm:h-1/4 bg-indigo-600 text-white rounded-md p-2 hover:bg-indigo-700 transition duration-200"
              >
                {loading ? "Logging In.." : "Log In"}
              </button>
              <Link
                href={"/newUser"}
                className="w-1/2 max-sm:mt-2 max-sm:w-1/2 max-sm:h-1/4 bg-gray-300 text-center text-black rounded-md p-2 hover:bg-gray-400 transition duration-200"
              >
                Register
              </Link>
            </div>
          </form>
        </article>
        <article className="max-xl:hidden block space-y-4 h-[100%] w-[80%] ">
          <Image
            src={"/password.svg"}
            alt="login sticker"
            width={0}
            height={0}
            style={{ width: "100%" }}
            className="h-[90%]"
            priority={false}
          />
          <h5 className="text-center font-bold text-slate-200">
            &quot;Being a student or young doesn't mean you know nothing. <br />{" "}
            Speak up and let your voice be heard!&quot;
          </h5>
        </article>
      </main>
    </>
  );
}
