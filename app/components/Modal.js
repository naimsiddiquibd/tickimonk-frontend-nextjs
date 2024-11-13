import React, { useState } from "react";
import { XMarkIcon } from '@heroicons/react/24/solid'

const Modal = ({ title, value, onSave, onClose }) => {
  const [inputValue, setInputValue] = useState(value || "");

  const handleSave = () => {
    onSave(inputValue);
    onClose();
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) { // Check for Enter without Shift
      e.preventDefault(); // Prevent newline
      handleSave();
    }
  };

  const getTitleText = (title) => {
    switch (title) {
      case "Add venue":
        return "Please enter the location of the event";
      case "Add description":
        return "Provide a description for the event";
      case "Add specialInstructions":
        return "Add any special instructions";
      case "Add price":
        return "Specify the price for this event";
      case "Add dressCode":
        return "Mention the dress code if applicable";
      default:
        return title;
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-[#323537] rounded-xl w-full max-w-md lg:mx-0">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold px-5 py-4 text-gray-200">{getTitleText(title)}</h2>
          <XMarkIcon className="size-7 cursor-pointer bg-[#424547] p-2 rounded-full text-gray-200 mr-3" onClick={onClose} />
        </div>
        <textarea
          className="w-full pt-3 px-5 border border-none h-36 text-gray-200 outline-none"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown} // Added onKeyDown event
          placeholder="Enter your text or number here..." // Example placeholder, can be customized
        />
        <div className="flex justify-end gap-2">
          <button className="bg-gray-200 text-gray-800 px-4 py-1 rounded-md m-3" onClick={handleSave}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
