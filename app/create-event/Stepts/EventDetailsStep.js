import React from "react";

const EventDetailsStep = ({ formData, handleChange }) => (
  <div>
    <div className="flex flex-col">
      <label htmlFor="eventName" className="mb-2 font-medium">Event Name</label>
      <input
        type="text"
        id="eventName"
        name="eventName"
        value={formData.eventName}
        onChange={handleChange}
        className="bg-white p-3 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
      />
    </div>

    {/* <div className="flex flex-col mt-4">
      <label htmlFor="organizer" className="mb-2 font-medium">Organizer</label>
      <input
        type="text"
        id="organizer"
        name="organizer"
        value={formData.organizer}
        className="bg-white p-3 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        onChange={handleChange}
        required
      />
    </div> */}

    <div className="flex flex-col mt-4">
      <label htmlFor="eventCategory" className="mb-2 font-medium">Event Category</label>
      <input
        type="text"
        id="eventCategory"
        name="eventCategory"
        value={formData.eventCategory}
        className="bg-white p-3 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        onChange={handleChange}
        required
      />
    </div>
  </div>
);

export default EventDetailsStep;
