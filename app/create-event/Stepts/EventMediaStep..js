import React from "react";

const EventMediaStep = ({ formData, handleChange }) => (
  <div>
    <div className="flex flex-col">
      <label htmlFor="logo" className="mb-2 font-medium">Logo</label>
      <input
        type="file"
        id="eventLogo"
        name="eventLogo"
        accept="image/*"
        className="bg-white p-3 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        onChange={handleChange}
        required
      />
    </div>

    <div className="flex flex-col mt-4">
      <label htmlFor="thumbnail" className="mb-2 font-medium">Thumbnail</label>
      <input
        type="file"
        id="thumbnail"
        name="thumbnail"
        accept="image/*"
        className="bg-white p-3 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        onChange={handleChange}
        required
      />
    </div>
  </div>
);

export default EventMediaStep;
