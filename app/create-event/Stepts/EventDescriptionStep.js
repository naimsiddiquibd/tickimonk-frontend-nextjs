import React from "react";

const EventDescriptionStep = ({ formData, handleChange }) => (
  <div>
    <div className="flex flex-col">
      <label htmlFor="description" className="mb-2 font-medium">Description</label>
      <textarea
        id="description"
        name="description"
        value={formData.description}
        className="bg-white p-3 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        onChange={handleChange}
        required
      />
    </div>

    <div className="flex flex-col mt-4">
      <label htmlFor="specialInstructions" className="mb-2 font-medium">Special Instructions</label>
      <textarea
        id="specialInstructions"
        name="specialInstructions"
        value={formData.specialInstructions}
        className="bg-white p-3 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        onChange={handleChange}
        required
      />
    </div>

    <div className="flex flex-col mt-4">
      <label htmlFor="price" className="mb-2 font-medium">Price</label>
      <input
        type="number"
        id="price"
        name="price"
        value={formData.price}
        className="bg-white p-3 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        onChange={handleChange}
        required
        min="0"
        step="0.01"
      />
    </div>
  </div>
);

export default EventDescriptionStep;
