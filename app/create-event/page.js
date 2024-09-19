// "use client";

// import { createEvent } from '@/utils/actions/createEvent';
// import React, { useState } from 'react';

// const EventForm = () => {
//     const [formData, setFormData] = useState({
//         eventName: '',
//         organizer: '',
//         eventCategory: '',
//         venue: '',
//         startDateTime: '',
//         endDateTime: '',
//         timezone: '',
//         recurringEvent: false,
//         ageRestriction: 'All Ages',
//         dressCode: '',
//         description: '',
//         specialInstructions: '',
//         logo: null,
//         thumbnail: null,
//     });

//     const [message, setMessage] = useState({ text: '', type: '' });

//     const handleChange = (e) => {
//         const { name, type, value, checked, files } = e.target;

//         if (type === 'file') {
//             setFormData((prevData) => ({
//                 ...prevData,
//                 [name]: files[0],
//             }));
//         } else if (type === 'checkbox') {
//             setFormData((prevData) => ({
//                 ...prevData,
//                 [name]: checked,
//             }));
//         } else {
//             setFormData((prevData) => ({
//                 ...prevData,
//                 [name]: value,
//             }));
//         }
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         const data = new FormData();
//         Object.entries(formData).forEach(([key, value]) => {
//             data.append(key, value);
//         });

//         // Use createEvent function to handle API request
//         const result = await createEvent(data);

//         if (result.success) {
//             setMessage({ text: 'Event created successfully!', type: 'success' });
//             console.log('Event created:', result.data);
//         } else {
//             setMessage({ text: `Error: ${result.error}`, type: 'error' });
//             console.error('Error creating event:', result.error);
//         }
//     };

//     return (
//         <div className="max-w-4xl mx-auto p-8 bg-white shadow-md rounded-md mt-12">
//             <p className='text-center font-bold text-gray-500'>Create Event</p>
//             <p className='text-center text-xs font-semibold text-gray-400 mt-3 mb-4'>
//                 Welcome to the Ticketing System! Log in to purchase tickets or create and manage events with ease. Sign in to get started!
//             </p>
//             <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 {/* Event Name */}
//                 <div className="flex flex-col">
//                     <label htmlFor="eventName" className="mb-2 font-medium">Event Name</label>
//                     <input
//                         type="text"
//                         id="eventName"
//                         name="eventName"
//                         className="bg-[#ffffff] p-3 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//                         onChange={handleChange}
//                         required
//                     />
//                 </div>

//                 {/* Organizer */}
//                 <div className="flex flex-col">
//                     <label htmlFor="organizer" className="mb-2 font-medium">Organizer</label>
//                     <input
//                         type="text"
//                         id="organizer"
//                         name="organizer"
//                         className="bg-[#ffffff] p-3 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//                         onChange={handleChange}
//                         required
//                     />
//                 </div>

//                 {/* Event Category */}
//                 <div className="flex flex-col">
//                     <label htmlFor="eventCategory" className="mb-2 font-medium">Event Category</label>
//                     <input
//                         type="text"
//                         id="eventCategory"
//                         name="eventCategory"
//                         className="bg-[#ffffff] p-3 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//                         onChange={handleChange}
//                         required
//                     />
//                 </div>

//                 {/* Venue */}
//                 <div className="flex flex-col">
//                     <label htmlFor="venue" className="mb-2 font-medium">Venue</label>
//                     <input
//                         type="text"
//                         id="venue"
//                         name="venue"
//                         className="bg-[#ffffff] p-3 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//                         onChange={handleChange}
//                         required
//                     />
//                 </div>

//                 {/* Start DateTime */}
//                 <div className="flex flex-col">
//                     <label htmlFor="startDateTime" className="mb-2 font-medium">Start Date & Time</label>
//                     <input
//                         type="datetime-local"
//                         id="startDateTime"
//                         name="startDateTime"
//                         className="bg-[#ffffff] p-3 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//                         onChange={handleChange}
//                         required
//                     />
//                 </div>

//                 {/* End DateTime */}
//                 <div className="flex flex-col">
//                     <label htmlFor="endDateTime" className="mb-2 font-medium">End Date & Time</label>
//                     <input
//                         type="datetime-local"
//                         id="endDateTime"
//                         name="endDateTime"
//                         className="bg-[#ffffff] p-3 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//                         onChange={handleChange}
//                         required
//                     />
//                 </div>

//                 {/* Timezone */}
//                 <div className="flex flex-col">
//                     <label htmlFor="timezone" className="mb-2 font-medium">Timezone</label>
//                     <input
//                         type="text"
//                         id="timezone"
//                         name="timezone"
//                         className="bg-[#ffffff] p-3 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//                         onChange={handleChange}
//                         required
//                     />
//                 </div>

//                 {/* Recurring Event */}
//                 <div className="flex items-center space-x-2">
//                     <input
//                         type="checkbox"
//                         id="recurringEvent"
//                         name="recurringEvent"
//                         className="h-4 w-4 text-[#E61D64] border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
//                         onChange={handleChange}
//                     />
//                     <label htmlFor="recurringEvent" className="font-medium">Recurring Event</label>
//                 </div>

//                 {/* Age Restriction */}
//                 <div className="flex flex-col">
//                     <label htmlFor="ageRestriction" className="mb-2 font-medium">Age Restriction</label>
//                     <select
//                         id="ageRestriction"
//                         name="ageRestriction"
//                         className="bg-[#ffffff] p-3 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//                         onChange={handleChange}
//                         defaultValue="All Ages"
//                     >
//                         <option value="All Ages">All Ages</option>
//                         <option value="18+">18+</option>
//                         <option value="21+">21+</option>
//                     </select>
//                 </div>

//                 {/* Dress Code */}
//                 <div className="flex flex-col">
//                     <label htmlFor="dressCode" className="mb-2 font-medium">Dress Code</label>
//                     <input
//                         type="text"
//                         id="dressCode"
//                         name="dressCode"
//                         className="bg-[#ffffff] p-3 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//                         onChange={handleChange}
//                     />
//                 </div>

//                 {/* Description */}
//                 <div className="flex flex-col md:col-span-2">
//                     <label htmlFor="description" className="mb-2 font-medium">Description</label>
//                     <textarea
//                         id="description"
//                         name="description"
//                         className="bg-[#ffffff] p-3 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//                         rows="4"
//                         onChange={handleChange}
//                         required
//                     ></textarea>
//                 </div>

//                 {/* Special Instructions */}
//                 <div className="flex flex-col md:col-span-2">
//                     <label htmlFor="specialInstructions" className="mb-2 font-medium">Special Instructions</label>
//                     <textarea
//                         id="specialInstructions"
//                         name="specialInstructions"
//                         className="bg-[#ffffff] p-3 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//                         rows="4"
//                         onChange={handleChange}
//                     ></textarea>
//                 </div>

//                 <div className="flex flex-col">
//                     <label htmlFor="eventLogo" className="mb-2 font-medium">Logo</label>
//                     <input
//                         type="file"
//                         id="eventLogo"
//                         name="eventLogo"  // Change from 'logo' to 'eventLogo'
//                         className="p-3"
//                         accept="image/*"
//                         onChange={handleChange}
//                     />
//                 </div>

//                 {/* Thumbnail */}
//                 <div className="flex flex-col">
//                     <label htmlFor="thumbnail" className="mb-2 font-medium">Thumbnail</label>
//                     <input
//                         type="file"
//                         id="thumbnail"
//                         name="thumbnail"
//                         className="p-3"
//                         accept="image/*"
//                         onChange={handleChange}
//                     />
//                 </div>

//                 {/* Submit Button */}
//                 <div className="flex md:col-span-2 justify-center">
//                     <button
//                         type="submit"
//                         className="bg-[#E61D64] text-white px-4 py-2 rounded-md hover:bg-[#B9174E] focus:outline-none focus:ring-2 focus:ring-blue-500"
//                     >
//                         Create Event
//                     </button>
//                 </div>
//             </form>

//             {message.text && (
//                 <div className={`mt-4 text-center ${message.type === 'success' ? 'text-green-500' : 'text-red-500'}`}>
//                     {message.text}
//                 </div>
//             )}
//         </div>
//     );
// };

// export default EventForm;



"use client";

import React, { useState } from "react";
import { createEvent } from "@/utils/actions/createEvent";
import EventDetailsStep from "./Stepts/EventDetailsStep";
import EventScheduleStep from "./Stepts/EventScheduleStep";
import EventSettingsStep from "./Stepts/EventSettingsStep";
import EventDescriptionStep from "./Stepts/EventDescriptionStep";
import EventMediaStep from "./Stepts/EventMediaStep.";

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
    <div className="max-w-4xl mx-auto p-8 bg-white shadow-sm rounded-md mt-12 w-[500px]">
      <p className="text-center font-bold text-gray-500">Create Event</p>
      <p className="text-center text-xs font-semibold text-gray-400 mt-3 mb-4">
        Follow the steps to create your event.
      </p>
      {message.text && (
        <div
          className={`mt-4 text-center ${
            message.type === "success" ? "text-green-500" : "text-red-500"
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
            className="bg-gray-300 text-gray-900 px-12 py-3 rounded-full"
          >
            Previous
          </button>
        )}
        {currentStep < 5 ? (
          <button
            type="button"
            onClick={handleNext}
            className="bg-[#E61D64] text-white px-12 py-3 rounded-full"
          >
            Next
          </button>
        ) : (
          <button
            type="button"
            onClick={handleSubmit}
            className="bg-[#E61D64] text-white px-12 py-3 rounded-full"
          >
            Submit
          </button>
        )}
      </div>
    </div>
  );
};

export default EventForm;
