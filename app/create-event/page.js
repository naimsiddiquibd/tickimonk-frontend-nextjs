"use client";

import React, { useState } from "react";
import { createEvent } from "@/utils/actions/createEvent";
import EventDetailsStep from "./Stepts/EventDetailsStep";
import EventScheduleStep from "./Stepts/EventScheduleStep";
import EventSettingsStep from "./Stepts/EventSettingsStep";
import EventDescriptionStep from "./Stepts/EventDescriptionStep";
import EventMediaStep from "./Stepts/EventMediaStep.";
import { changeUserRole } from "@/utils/actions/changeUserRole";

const EventForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    eventName: "",
    // organizer: "",
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

  const [message, setMessage] = useState({ text: "", type: "" });

  const handleChange = (e) => {
    const { name, type, value, checked, files } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "file" ? files[0] : type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async () => {
    // Step 1: Change the user's role before submitting the event
    const roleChangeResult = await changeUserRole("organizer");

    if (!roleChangeResult.success) {
      // Handle role change failure
      setMessage({
        text: `Error updating role: ${roleChangeResult.error}`,
        type: "error",
      });
      return; // Stop the submission process if the role change fails
    }

    // Step 2: Proceed to create the event after successfully changing the role
    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      data.append(key, value);
    });

    const result = await createEvent(data);

    if (result.success) {
      setMessage({ text: "Event created successfully!", type: "success" });
    } else {
      setMessage({ text: `Error: ${result.error}`, type: "error" });
    }
  };


  const validateStep = () => {
    // Add validation for each step based on the current step
    switch (currentStep) {
      case 1:
        // Example: Check if eventName and organizer fields are filled
        return formData.eventName.trim() !== "";
      case 2:
        // Example: Check if startDateTime and endDateTime fields are filled
        return formData.startDateTime.trim() !== "" && formData.endDateTime.trim() !== "";
      case 3:
        // Example: Check if ageRestriction and dressCode fields are filled
        return formData.ageRestriction.trim() !== "" && formData.dressCode.trim() !== "";
      case 4:
        // Example: Check if description field is filled
        return formData.description.trim() !== "";
      case 5:
        // Example: Check if logo and thumbnail are uploaded
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
            <li><a>My Tickets</a></li>
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

        {currentStep === 1 && (
          <EventDetailsStep formData={formData} handleChange={handleChange} />
        )}
        {currentStep === 2 && (
          <EventScheduleStep formData={formData} handleChange={handleChange} />
        )}
        {currentStep === 3 && (
          <EventSettingsStep formData={formData} handleChange={handleChange} />
        )}
        {currentStep === 4 && (
          <EventDescriptionStep formData={formData} handleChange={handleChange} />
        )}
        {currentStep === 5 && (
          <EventMediaStep formData={formData} handleChange={handleChange} />
        )}

        <div className="flex justify-end mt-6 gap-3">
          {currentStep > 1 && (
            <button
              type="button"
              onClick={handlePrev}
              className="bg-gray-300 text-gray-900 px-12 py-3 rounded-sm"
            >
              Previous
            </button>
          )}
          {currentStep < 5 ? (
            <button
              type="button"
              onClick={handleNext}
              className="bg-[#E61D64] text-white px-12 py-3 rounded-sm"
            >
              Next
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSubmit}
              className="bg-[#E61D64] text-white px-12 py-3 rounded-sm"
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
