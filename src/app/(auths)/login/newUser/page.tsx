"use client";

import React, { useState } from "react";
import { updateProfile } from "./fillup";
import Loading from "@/components/loading";

export default function Page() {
  //
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    course: "",
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
    firstName: string;
    lastName: string;
    course: string;
  }) => {
    const formData = new FormData();
    formData.append("firstName", data.firstName);
    formData.append("lastName", data.lastName);
    formData.append("course", data.course);
    return formData;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.firstName || !formData.lastName || !formData.course) {
      alert("Please fill in all fields.");
      return;
    }

    setIsSubmitting(true);

    try {
      // Convert the form data to FormData format
      const formDataToSend = convertToFormData(formData);
      await updateProfile(formDataToSend); // Pass the FormData object
    } catch (e) {
      console.error(e);
      alert(`An error has occured.. ${e}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  console.log(formData);

  return (
    <div className="h-[100vh] relative w-full bg-neutral-950 flex flex-col items-center justify-center antialiased">
      <div className="p-[8em] flex items-center justify-center rounded-md bg-gradient-to-br from-slate-500 from-10% via-slate-900 via-30% to-indigo-700 to-90%">
        {/* new User input their first name and last name */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <h3 className="text-3xl text-white">
            Hello there, new user! <br />
            Kindly fill up the forms, thank you!
          </h3>
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
              className="mt-1 p-2 rounded border border-gray-300 w-full"
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
          {/* option courses */}

          <div>
            <label htmlFor="fname" className="block text-white">
              First name:
            </label>

            {/* Loading here */}
            {isSubmitting && <Loading />}

            <input
              type="text"
              id="fname"
              name="fname"
              value={formData.firstName}
              onChange={handleChange} // Handle change of the input value
              className="mt-1 p-2 rounded border border-gray-300 w-full"
            />
          </div>

          <div>
            <label htmlFor="lname" className="block text-white">
              Last name:
            </label>
            <input
              type="text"
              id="lname"
              name="lname"
              value={formData.lastName}
              onChange={handleChange} // Handle change of the input value
              className="mt-1 p-2 rounded border border-gray-300 w-full"
            />
          </div>

          <button
            type="submit"
            className="mt-4 p-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
