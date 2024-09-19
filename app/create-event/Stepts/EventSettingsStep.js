import React from "react";

const EventSettingsStep = ({ formData, handleChange }) => (
  <div>
    <div className="flex flex-col">
      <label htmlFor="timezone" className="mb-2 font-medium">Timezone</label>
      <input
        type="text"
        id="timezone"
        name="timezone"
        value={formData.timezone}
        className="bg-white p-3 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        onChange={handleChange}
        required
      />
    </div>

    <div className="flex items-center mt-4">
      <input
        type="checkbox"
        id="recurringEvent"
        name="recurringEvent"
        checked={formData.recurringEvent}
        className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        onChange={handleChange}
      />
      <label htmlFor="recurringEvent" className="ml-2 text-sm font-medium">Recurring Event</label>
    </div>

    <div className="flex flex-col mt-4">
      <label htmlFor="ageRestriction" className="mb-2 font-medium">Age Restriction</label>
      <select
        id="ageRestriction"
        name="ageRestriction"
        value={formData.ageRestriction}
        className="bg-white p-3 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        onChange={handleChange}
        required
      >
        <option value="All Ages">All Ages</option>
        <option value="18+">18+</option>
        <option value="21+">21+</option>
      </select>
    </div>

    <div className="flex flex-col mt-4">
      <label htmlFor="dressCode" className="mb-2 font-medium">Dress Code</label>
      <input
        type="text"
        id="dressCode"
        name="dressCode"
        value={formData.dressCode}
        className="bg-white p-3 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        onChange={handleChange}
        required
      />
    </div>
  </div>
);

export default EventSettingsStep;
