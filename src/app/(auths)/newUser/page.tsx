"use client";
import React, { useState } from "react";
import { updateProfile } from "./fillup";
import Loading from "@/components/loading";
import { FaEyeSlash, FaEye } from "react-icons/fa";
import Alert from "./alert";
import { Login } from "@/types/here";

import { useRouter } from "next/navigation";
export default function Page() {
  //
  const router = useRouter();
  const [error, setError] = useState<boolean>(false);
  const [descError, setDescError] = useState<string | null>("");
  const [toggleView, setToggleView] = useState<boolean>(false);
  const [formData, setFormData] = useState<Login>({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    course: "",
    collegeYear: "",
  });

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const convertToFormData = (data: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    course: string;
    collegeYear: string;
  }) => {
    //
    if (!data.email.includes("@") || !data.email.includes("@gmail.com")) {
      setError(true);
      setDescError("Email field requires '@' to identify a certain email. ");
      return null;
    } else if (data.password.length < 6) {
      setError(true);
      setDescError("Password must be at least 6 letters long.");
      return null;
    }

    const formsData = new FormData();
    formsData.append("email", data.email);
    formsData.append("password", data.password);
    formsData.append("firstName", data.firstName);
    formsData.append("lastName", data.lastName);
    formsData.append("course", data.course);
    formsData.append("collegeYear", data.collegeYear);
    return formsData;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      !formData.email ||
      !formData.password ||
      !formData.firstName ||
      !formData.lastName ||
      !formData.course ||
      !formData.collegeYear //....
    ) {
      setDescError("All fields are required to fill in.");
      setError(true);
      return;
    }

    setIsSubmitting(true);

    try {
      // Convert the form data to FormData format
      const formDataToSend = convertToFormData(formData);
      if (!formDataToSend) return;

      const result = await updateProfile(formDataToSend);
      if (result.success) {
        router.push(result.redirectUrl);
      }
    } catch (e) {
      console.error(e);
      alert(`An error has occured: ${e}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  console.log(formData);

  return (
    <div className="h-[100vh] relative w-full bg-neutral-950 flex flex-col items-center justify-center antialiased">
      <div className="py-[1em] px-[6em] flex items-center justify-center rounded-md bg-gradient-to-br from-slate-500 from-10% via-slate-900 via-30% to-indigo-700 to-90%">
        {/* Loading here */}
        {isSubmitting && (
          <div className="transition-all">
            <Loading />
          </div>
        )}
        {error && <Alert errorDesc={descError} close={() => setError(false)} />}
        {/* new User input their first name and last name */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <h3 className="text-3xl text-center text-white">
            Hello there, new user! <br />
            Kindly fill up the forms, thank you!
          </h3>

          <div>
            <label htmlFor="password" className="block text-white">
              Email:
            </label>

            <input
              type="text"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 p-2 rounded border border-gray-300 w-full"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-white">
              Password:
            </label>
            <div className="flex">
              <input
                type={toggleView ? "password" : "text"}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="mt-1 p-2 rounded border border-gray-300 w-full"
              />
              <button
                onClick={(e) => {
                  setToggleView(!toggleView);
                  e.preventDefault();
                }}
                className="text-white bg-white px-3 rounded-md"
              >
                {toggleView ? (
                  <FaEyeSlash color="black" />
                ) : (
                  <FaEye color="black" />
                )}
              </button>
            </div>
          </div>
          <hr />
          <div>
            {/* Option Courses here */}
            <label htmlFor="course" className="block text-white">
              Course:
            </label>
            <select
              name="course"
              id="course"
              value={formData.course} //bind value to the formData state
              onChange={handleChange}
              className="mt-1 p-2 rounded border border-gray-300 w-full "
            >
              <option value="">Select a course</option>
              <option value="Computer Science">Computer Science</option>
              <option value="Information Technology">
                Information Technology
              </option>
              <option value="Secondary Education">Secondary Education</option>
              <option value="Hospitality Management">
                Hospitality Management
              </option>
              <option value="Tourism Management">Tourism Management</option>
              <option value="Office Administration">
                Office Administration
              </option>
              <option value="Business Administration">
                Business Administration
              </option>
            </select>
          </div>
          <div>
            {/* Option of College Year here */}
            <label htmlFor="collegeYear" className="block text-white">
              College Year:
            </label>
            <select
              name="collegeYear"
              id="collegeYear"
              value={formData.collegeYear} //bind value to the formData state
              onChange={handleChange}
              className="mt-1 p-2 rounded border border-gray-300 w-full"
            >
              <option value="">Select</option>
              <option value="Freshman">First Year | Freshman</option>
              <option value="Sophomore">Second Year | Sophomore</option>
              <option value="Junior">Third Year | Junior</option>
              <option value="Senior">Fourth Year | Senior</option>
              <option value="Graduated">Graduated</option>
            </select>
          </div>
          <div>
            <label htmlFor="firstName" className="block text-white">
              First name:
            </label>

            <input
              type="text"
              id="fname"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange} // Handle change of the input value
              className="mt-1 p-2 rounded border border-gray-300 w-full"
            />
          </div>

          <div>
            <label htmlFor="lastName" className="block text-white">
              Last name:
            </label>
            <input
              type="text"
              id="lname"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange} // Handle change of the input value
              className="mt-1 p-2 rounded border border-gray-300 w-full"
            />
          </div>

          <button
            type="submit"
            className="mt-4 p-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
          >
            {isSubmitting ? "Submitting..." : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
}