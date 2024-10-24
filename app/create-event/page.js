"use client";

import React, { useState, useEffect } from "react";
import { createEvent } from "@/utils/actions/createEvent";
import EventDetailsStep from "./Stepts/EventDetailsStep";
import EventScheduleStep from "./Stepts/EventScheduleStep";
import EventSettingsStep from "./Stepts/EventSettingsStep";
import EventDescriptionStep from "./Stepts/EventDescriptionStep";
import EventMediaStep from "./Stepts/EventMediaStep.";
import { changeUserRole } from "@/utils/actions/changeUserRole";
import { fetchCurrentUser } from "@/utils/actions/fetchCurrentUser";
import { signOut } from "next-auth/react";

const EventForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    eventName: "",
    eventCategory: "",
    venue: "",
    startDateTime: "",
    endDateTime: "",
    timezone: "",
    recurringEvent: false,
    ageRestriction: "All Ages",
    dressCode: "",
    description: "",
    specialInstructions: "",
    price: "",
    logo: null,
    thumbnail: null,
  });

  const [loading, setLoading] = useState(false); // Loading state
  const [message, setMessage] = useState({ text: "", type: "" });

  const [user, setUser] = useState(null); // State to hold user data
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, type, value, checked, files } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "file" ? files[0] : type === "checkbox" ? checked : value,
    }));
  };

  useEffect(() => {
    const getCurrentUser = async () => {
      const result = await fetchCurrentUser();
      if (result.success) {
        console.log('Current User Data:', result.data);
        setUser(result.data); // Set the user data in state
      } else {
        console.error('Error fetching current user:', result.error);
        setError(result.error); // Set the error in state
      }
    };

    getCurrentUser();
  }, []);

  console.log("User role from current api:", user?.role);

  const handleSubmit = async () => {
    setLoading(true); // Start loading when submitting
    try {
      let roleChanged = false;

      // Step 1: Check and change the user's role if necessary
      if (user.role !== "organizer") {
        const roleChangeResult = await changeUserRole("organizer");
        if (!roleChangeResult.success) {
          setMessage({
            text: `Error updating role: ${roleChangeResult.error}`,
            type: "error",
          });
          setLoading(false);
          return;
        }
        roleChanged = true; // Track that the role has changed
      }

      // Step 2: Proceed to create the event after ensuring the role is "organizer"
      const data = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        data.append(key, value);
      });

      const result = await createEvent(data);

      if (result.success) {
        setMessage({ text: "Event created successfully!", type: "success" });

        // Step 3: Log out if the user's role was changed
        if (roleChanged) {
          await signOut(); // Call the logout function
        }
      } else {
        setMessage({ text: `Error: ${result.error}`, type: "error" });
      }
    } catch (error) {
      setMessage({ text: "An unexpected error occurred.", type: "error" });
    } finally {
      setLoading(false); // Stop loading after submission
    }
  };

  const validateStep = () => {
    switch (currentStep) {
      case 1:
        return formData.eventName.trim() !== "";
      case 2:
        return formData.startDateTime.trim() !== "" && formData.endDateTime.trim() !== "";
      case 3:
        return formData.ageRestriction.trim() !== "" && formData.dressCode.trim() !== "";
      case 4:
        return formData.description.trim() !== "";
      case 5:
        return formData.logo !== null && formData.thumbnail !== null;
      default:
        return true;
    }
  };

  const handleNext = () => {
    if (validateStep()) {
      setCurrentStep((prevStep) => prevStep + 1);
    } else {
      setMessage({ text: "Please fill all required fields before proceeding.", type: "error" });
    }
  };

  const handlePrev = () => setCurrentStep((prevStep) => prevStep - 1);

  return (
    <div className="pt-28 lg:mx-28 mx-5 2xl:mx-96 pb-16 lg:h-screen h-full">
      <div className='flex justify-start items-center gap-2'>
        <div className="breadcrumbs text-sm text-gray-400">
          <ul>
            <li><a>Home</a></li>
            <li><a>My Tickets {user?.name}</a></li>
          </ul>
        </div>
      </div>
      <div className="max-w-4xl mx-auto p-8 shadow-sm rounded-md lg:w-[500px] w-full bg-white">
        <p className="text-center font-bold text-gray-500">Create Event</p>
        <p className="text-center text-xs font-semibold text-gray-400 mt-3 mb-4">
          Follow the steps to create your event.
        </p>
        {message.text && (
          <div
            className={`mt-4 text-center ${message.type === "success" ? "text-green-500" : "text-red-500"
              }`}
          >
            {message.text}
          </div>
        )}

        {loading && <p className="text-center text-gray-500">Loading...</p>} {/* Loading indicator */}

        {!loading && currentStep === 1 && (
          <EventDetailsStep formData={formData} handleChange={handleChange} />
        )}
        {!loading && currentStep === 2 && (
          <EventScheduleStep formData={formData} handleChange={handleChange} />
        )}
        {!loading && currentStep === 3 && (
          <EventSettingsStep formData={formData} handleChange={handleChange} />
        )}
        {!loading && currentStep === 4 && (
          <EventDescriptionStep formData={formData} handleChange={handleChange} />
        )}
        {!loading && currentStep === 5 && (
          <EventMediaStep formData={formData} handleChange={handleChange} />
        )}

        <div className="flex justify-end mt-6 gap-3">
          {currentStep > 1 && (
            <button
              type="button"
              onClick={handlePrev}
              className="bg-gray-300 text-gray-900 px-12 py-3 rounded-sm"
              disabled={loading} // Disable buttons while loading
            >
              Previous
            </button>
          )}
          {currentStep < 5 ? (
            <button
              type="button"
              onClick={handleNext}
              className="bg-[#E61D64] text-white px-12 py-3 rounded-sm"
              disabled={loading} // Disable buttons while loading
            >
              Next
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSubmit}
              className="bg-[#E61D64] text-white px-12 py-3 rounded-sm"
              disabled={loading} // Disable buttons while loading
            >
              Submit
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventForm;
