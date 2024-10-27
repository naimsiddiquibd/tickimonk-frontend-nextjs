import React, { useState } from "react";

const Modal = ({ title, value, onSave, onClose }) => {
  const [inputValue, setInputValue] = useState(value || "");

  const handleSave = () => {
    onSave(inputValue);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white bg-opacity-80 p-4 rounded-md w-full max-w-md  lg:mx-0 mx-4">
        <h2 className="text-lg font-semibold mb-2 text-gray-800">{title}</h2>
        <textarea
          className="w-full p-2 border border-gray-300 rounded-md h-32"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <div className="flex justify-end gap-2 mt-4">
          <button className="bg-gray-500 px-4 py-1 rounded" onClick={onClose}>
            Close
          </button>
          <button className="bg-[#112D59] text-white px-4 py-1 rounded" onClick={handleSave}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
