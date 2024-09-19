import React from "react";

const EventScheduleStep = ({ formData, handleChange }) => (
  <div>
    <div className="flex flex-col">
      <label htmlFor="venue" className="mb-2 font-medium">Venue</label>
      <input
        type="text"
        id="venue"
        name="venue"
        value={formData.venue}
        className="bg-white p-3 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        onChange={handleChange}
        required
      />
    </div>

    <div className="flex flex-col mt-4">
      <label htmlFor="startDateTime" className="mb-2 font-medium">Start Date & Time</label>
      <input
        type="datetime-local"
        id="startDateTime"
        name="startDateTime"
        value={formData.startDateTime}
        className="bg-white p-3 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        onChange={handleChange}
        required
      />
    </div>

    <div className="flex flex-col mt-4">
      <label htmlFor="endDateTime" className="mb-2 font-medium">End Date & Time</label>
      <input
        type="datetime-local"
        id="endDateTime"
        name="endDateTime"
        value={formData.endDateTime}
        className="bg-white p-3 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        onChange={handleChange}
        required
      />
    </div>
  </div>
);

export default EventScheduleStep;
