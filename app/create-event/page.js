
"use client";

import React, { useState, useEffect } from "react";
import { createEvent } from "@/utils/actions/createEvent";
import { changeUserRole } from "@/utils/actions/changeUserRole";
import { fetchCurrentUser } from "@/utils/actions/fetchCurrentUser";
import { signOut } from "next-auth/react";
import { PhotoIcon, ArrowUpTrayIcon, GlobeAltIcon, ClockIcon, MapPinIcon, NewspaperIcon, CurrencyBangladeshiIcon, LinkSlashIcon, ArrowUturnUpIcon, ScissorsIcon, PencilSquareIcon, TableCellsIcon } from '@heroicons/react/24/solid'
import Ball from '../../public/ball-category.png';
import StartEndIcon from '../../public/start-end.png';
import Image from "next/image";
import timezones from "@/constant/timezones";
import Modal from "../components/Modal";



const EventForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    eventName: "",
    eventCategory: "",
    venue: "",
    startDate: "",
    startTime: "",
    endDate: "",
    endTime: "",
    timezone: "",
    recurringEvent: false,
    ageRestriction: false,
    dressCode: "",
    eventStatus: "",
    description: "",
    specialInstructions: "",
    price: "",
    eventLogo: null,
    thumbnail: null,
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedLogo, setSelectedLogo] = useState(null);
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

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


  const handleChange = (e) => {
    const { name, type, value, checked, files } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "file" ? files[0] : type === "checkbox" ? checked : value,
    }));
  };

  const validateForm = () => {
    const errors = {};

    if (!formData.eventName) errors.eventName = "Event name is required";
    if (!formData.venue) errors.venue = "Venue is required";
    if (!formData.startDate) errors.startDate = "Start date is required";
    if (!formData.startTime) errors.startTime = "Start time is required";
    if (!formData.endDate) errors.endDate = "End date is required";
    if (!formData.endTime) errors.endTime = "End time is required";
    if (!formData.description) errors.description = "Description is required";
    if (!formData.price) errors.price = "Price is required";
    if (!formData.specialInstructions) errors.specialInstructions = "Special Instruction is required";
    if (!formData.eventLogo) {
      errors.eventLogo = "Event logo is required";
    }
    if (!formData.thumbnail) {
      errors.thumbnail = "Event thumbnail is required";
    }

    setError(errors);

    // Return true if there are no errors
    return Object.keys(errors).length === 0;
  };


  const handleSubmit = async () => {

    if (!validateForm()) {
      setMessage({
        text: "Please fill in all required fields.",
        type: "error",
      });
      return;
    }

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



  // Update the handleImageChange function to store the file in formData
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);

      // Update the formData to include the file as thumbnail
      setFormData((prevData) => ({
        ...prevData,
        thumbnail: file,
      }));
    }
  };

  // Update the handleLogoChange function to store the file in formData
  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const logoUrl = URL.createObjectURL(file);
      setSelectedLogo(logoUrl);

      // Update the formData to include the file as logo
      setFormData((prevData) => ({
        ...prevData,
        eventLogo: file,
      }));
    }
  };

  const [selectedTimezone, setSelectedTimezone] = useState({ offset: 'GMT+06:00', location: 'Dhaka' });

  const handleTimezoneChange = (event) => {
    const selected = timezones.find(tz => tz.offset === event.target.value);
    setSelectedTimezone(selected);

    setFormData((prevData) => ({
      ...prevData,
      timezone: selected.location, // Update the timezone in formData
    }));
  };

  const [popupState, setPopupState] = useState({
    field: null,
    isOpen: false,
  });

  const handleOpenPopup = (field) => {
    setPopupState({ field, isOpen: true });
  };

  const handleClosePopup = () => {
    setPopupState({ field: null, isOpen: false });
  };

  const handleSavePopup = (value) => {
    setFormData((prev) => ({
      ...prev,
      [popupState.field]: value,
    }));
    handleClosePopup();
  };

  const handleDateChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const [category, setCategory] = useState("Event");
  const [status, setStatus] = useState("Public");

  const handleCategoryChange = (e) => {
    const selectedCategory = e.target.value;
    setCategory(selectedCategory);

    setFormData((prevData) => ({
      ...prevData,
      eventCategory: selectedCategory, // Update the eventCategory in formData
    }));
  };

  const handleStatusChange = (e) => {
    const selectedStatus = e.target.value;
    setStatus(selectedStatus);

    setFormData((prevData) => ({
      ...prevData,
      eventStatus: selectedStatus, // Update the eventCategory in formData
    }));
  };

  const handleToggleChange = (e) => {
    const { name, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: checked,
    }));
  };

  return (
    <div className="bg-[#0f2a57] h-full lg:min-h-screen lg:pb-60 mb-16">

      <div className="lg:pt-10 pt-2  mx-5 lg:w-[780px] lg:mx-auto lg:pb-16 pb-0 lg:h-screen h-full">
        <div className="grid lg:grid-cols-3 gap-5">

          <div className="lg:col-span-1">

            {/* Thumbnail */}
            {error?.thumbnail && <p className="text-red-500 text-xs my-1">{error.thumbnail}</p>}

            <div className=" relative w-full h-80 bg-gray-200 rounded-lg overflow-hidden shadow-sm flex items-center justify-center">
              {/* Default or Selected Image */}
              <img
                src={
                  selectedImage ||
                  "https://i.ibb.co.com/9y5WWhz/626f4fb1-f399-46ca-b0a4-e80420d0cc44-1.png" // Default image URL
                }
                alt="Uploaded"
                className="w-full h-full object-cover"
              />

              {/* Upload Button */}
              <label className="absolute bottom-2 right-2 bg-white text-white text-sm py-2 px-2 rounded-full cursor-pointer hover:bg-[#0f2a57] border-2 border-gray-700 hover:border-white">
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageChange}
                />
                <PhotoIcon className="size-5 text-gray-600 hover:text-white" />
              </label>
            </div>

            {/* Logo */}
            {error?.eventLogo && <p className="text-red-500 text-xs my-1 mt-4">{error.eventLogo}</p>}
            <div className="bg-white bg-opacity-10 hover:bg-opacity-15 p-2 rounded-md mt-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gray-200 rounded-lg overflow-hidden shadow-sm flex items-center justify-center">
                    {/* Default or Selected Image */}
                    <img
                      src={
                        selectedLogo ||
                        "https://i.ibb.co.com/9y5WWhz/626f4fb1-f399-46ca-b0a4-e80420d0cc44-1.png" // Default image URL
                      }
                      alt="Uploaded"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="text-white text-sm ">{category || "Event"}</p>
                    <h5 className="text-white text-md font-semibold">{formData.eventName || "Event Name"}</h5>
                  </div>
                </div>
                <label className="cursor-pointer">
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleLogoChange}
                  />
                  <ArrowUpTrayIcon className="size-5 text-white hover:text-white" />
                </label>
              </div>
            </div>

          </div>


          <div className="lg:col-span-2">
            <div className="flex justify-between items-center">

              {/* Category */}
              <div>
                <div className="relative w-full max-w-xs">
                  {/* Left icon */}
                  <Image
                    src={Ball}
                    width={14}
                    height={14}
                    alt="Logo"
                    className="absolute left-3 top-1/2 transform -translate-y-1/2"
                  />
                  {/* Select dropdown */}
                  <select
                    value={category}
                    onChange={handleCategoryChange}
                    className="select pl-8 pr-8 bg-white bg-opacity-10 border-0 hover:bg-opacity-100 hover:bg-white hover:text-[#0f2a57] text-white h-8 min-h-8 rounded-md">
                    <option value="Event">Event</option>
                    <option value="Course">Course</option>
                  </select>
                </div>
              </div>

              {/* Status */}
              <div>
                <div className="relative w-full max-w-xs">
                  {/* Left icon */}
                  <GlobeAltIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 size-4 text-yellow-500" />
                  {/* Select dropdown */}
                  <select
                    value={status}
                    onChange={handleStatusChange}
                    className="select pl-8 pr-8 bg-white bg-opacity-10 border-0 hover:bg-opacity-100 hover:bg-white hover:text-[#0f2a57] text-white h-8 min-h-8 rounded-md">
                    <option value="Public" selected>Public</option>
                    <option value="Draft" >Draft</option>
                  </select>
                </div>
              </div>

            </div>

            {/* Event Name */}
            <div>
              <input
                type="text"
                placeholder="Event Name"
                id="eventName"
                name="eventName"
                value={formData.eventName}
                onChange={handleChange}
                className="input w-full max-full border-none bg-opacity-0 focus:outline-none placeholder-gray-400 lg:text-4xl text-2xl font-semibold p-0 mt-4"
              />
            </div>
            {error?.eventName && <p className="text-red-500 text-xs mt-1">{error.eventName}</p>}


            <div className="mt-4 grid lg:grid-cols-4 gap-3">

              {/* Start & End date */}
              {error?.startDate && <p className="text-red-500 text-xs">{error.startDate}</p>}
              {error?.startTime && <p className="text-red-500 text-xs">{error.startTime}</p>}
              {error?.endTime && <p className="text-red-500 text-xs">{error.endTime}</p>}
              {error?.endDate && <p className="text-red-500 text-xs">{error.endTime}</p>}
              <div className="bg-white bg-opacity-10 p-2 flex items-center justify-between rounded-md lg:col-span-3">

                <div className="lg:flex lg:items-center lg:gap-2 hidden">
                  <div>
                    <Image
                      src={StartEndIcon}
                      width={14}
                      height={14}
                      alt="Logo"
                      className=""
                    />
                  </div>
                  <div className="text-sm text-white grid grid-cols-1 gap-4 content-between h-full ">
                    <div>Start</div>
                    <div>End</div>
                  </div>
                </div>


                <div className="flex flex-col gap-1">
                  {/* Start date */}
                  <div className="flex items-center gap-0.5 text-sm">
                    <input
                      type="date"
                      name="startDate"
                      value={formData.startDate}
                      onChange={handleDateChange}
                      className="bg-white bg-opacity-20 text-white pl-2 pr-3 rounded-l-md py-1"
                    />

                    <input
                      type="time"
                      name="startTime"
                      value={formData.startTime}
                      onChange={handleDateChange}
                      className="bg-white bg-opacity-20 text-white px-2 rounded-r-md py-1"
                    />
                  </div>
                  {/* End date */}
                  <div className="flex items-center gap-0.5 text-sm">
                    <input
                      type="date"
                      name="endDate"
                      value={formData.endDate}
                      onChange={handleDateChange}
                      className="bg-white bg-opacity-20 text-white pl-2 pr-3 rounded-l-md py-1"
                    />
                    <input
                      type="time"
                      name="endTime"
                      value={formData.endTime}
                      onChange={handleDateChange}
                      className="bg-white bg-opacity-20 text-white px-2 rounded-r-md py-1"
                    />
                  </div>
                </div>
              </div>

              {/* Time zone */}
              <div className="lg:col-span-1 bg-white bg-opacity-10 p-2 flex flex-col items-start justify-between rounded-md">
                <ClockIcon className="size-4 text-gray-300" />
                <select
                  className="bg-transparent text-white text-sm font-medium outline-none appearance-none"
                  onChange={handleTimezoneChange}
                  value={selectedTimezone.offset}
                >
                  {timezones.map((tz, index) => (
                    <option key={index} value={tz.offset}>
                      {tz.location}
                    </option>
                  ))}
                </select>
                {/* <p className="font-medium">{selectedTimezone.offset}</p> */}
                <p className="text-xs">{selectedTimezone.offset}</p>
              </div>

            </div>

            {/* Event Location */}
            <div className="mt-3">
              {error?.venue && <p className="text-red-500 text-xs my-1">{error.venue}</p>}
              {/* <div>
                <div className="bg-white bg-opacity-10 p-2 flex items-center justify-start gap-2 rounded-md cursor-pointer"
                  onClick={() => handleOpenPopup("venue")}>
                  <MapPinIcon className="size-4 text-gray-300" />
                  <p className="font-bold text-sm text-white">Add Event Location</p>
                </div>
              </div> */}
              <div onClick={() => handleOpenPopup("venue")} className="bg-white cursor-pointer bg-opacity-10 p-2 gap-2  rounded-md">
                <div className="flex items-center gap-2 justify-start">
                  <MapPinIcon className="size-4 text-gray-300" />
                  <p className="font-bold text-sm text-white">Add Description</p>
                </div>
                <p>
                  {formData.venue
                    ? formData.venue.split(" ").slice(0, 20).join(" ") + (formData.venue.split(" ").length > 20 ? "..." : "")
                    : ""}
                </p>
              </div>
            </div>

            {/* Event Description */}
            <div className="mt-3">
              {error?.description && <p className="text-red-500 text-xs my-1">{error.description}</p>}
              <div onClick={() => handleOpenPopup("description")} className="bg-white cursor-pointer bg-opacity-10 p-2 gap-2  rounded-md">
                <div className="flex items-center gap-2 justify-start">
                  <NewspaperIcon className="size-4 text-gray-300" />
                  <p className="font-bold text-sm text-white">Add Description</p>
                </div>
                <p>
                  {formData.description
                    ? formData.description.split(" ").slice(0, 20).join(" ") + (formData.description.split(" ").length > 20 ? "..." : "")
                    : ""}
                </p>
              </div>
            </div>

            {/* Special Instruction*/}
            <div className="mt-3">
              {error?.specialInstructions && <p className="text-red-500 text-xs my-1">{error.specialInstructions}</p>}
              {/* <div onClick={() => handleOpenPopup("specialInstructions")} className="bg-white cursor-pointer bg-opacity-10 p-2 flex items-center justify-start gap-2  rounded-md">
                <TableCellsIcon className="size-4 text-gray-300" />
                <p className="font-bold text-sm text-white">Special Instruction</p>
              </div> */}
              <div onClick={() => handleOpenPopup("specialInstructions")} className="bg-white cursor-pointer bg-opacity-10 p-2 gap-2  rounded-md">
                <div className="flex items-center gap-2 justify-start">
                  <TableCellsIcon className="size-4 text-gray-300" />
                  <p className="font-bold text-sm text-white">Special Instructions</p>
                </div>
                <p>
                  {formData.specialInstructions
                    ? formData.specialInstructions.split(" ").slice(0, 20).join(" ") + (formData.specialInstructions.split(" ").length > 20 ? "..." : "")
                    : ""}
                </p>
              </div>
            </div>


            <div>
              <p className="text-sm text-white font-semibold mt-4 mb-2">Event Options</p>
              <div className="bg-white bg-opacity-10 p-2 rounded-md mt-1 py-3">

                {/* Event Price */}
                {error?.price && <p className="text-red-500 text-xs my-1">{error.price}</p>}
                <div className="flex items-center justify-between">
                  <div className="flex items-center justify-start gap-2">
                    <div>
                      <CurrencyBangladeshiIcon className="size-4 text-gray-300" />
                    </div>
                    <div className="text-sm text-white">Price</div>
                  </div>
                  <div className="flex items-center gap-3">
                    <p className="text-sm font-medium text-gray-300 ">
                      {formData?.price || "Currency"} BDT
                    </p>
                    <PencilSquareIcon onClick={() => handleOpenPopup("price")} className="cursor-pointer size-6 text-gray-300 mr-1" />
                  </div>

                </div>

                <div className="divider mt-1 mb-1"></div>

                {/* Age Restriction */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center justify-start gap-2">
                    <div>
                      <ScissorsIcon className="size-4 text-gray-300" />
                    </div>
                    <div className="text-sm text-white">Age Restriction</div>
                  </div>
                  <div>
                    <div className="form-control">
                      <label className="label cursor-pointer">
                        <input
                          type="checkbox"
                          name="ageRestriction"
                          checked={formData.ageRestriction}
                          onChange={handleToggleChange}
                          className="toggle toggle-primary" defaultChecked />
                      </label>
                    </div>
                  </div>
                </div>


                <div className="divider mt-1 mb-1"></div>
                {/* Recurring Event */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center justify-start gap-2">
                    <div>
                      <ArrowUturnUpIcon className="size-4 text-gray-300" />
                    </div>
                    <div className="text-sm text-white">Recurring Event</div>
                  </div>
                  <div>
                    <div className="form-control">
                      <label className="label cursor-pointer">
                        <input
                          type="checkbox"
                          name="recurringEvent"
                          checked={formData.recurringEvent}
                          onChange={handleToggleChange}
                          className="toggle toggle-primary" />
                      </label>
                    </div>
                  </div>
                </div>
                <div className="divider mt-1 mb-1"></div>

                {/* Dress Code */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center justify-start gap-2">
                    <div>
                      <LinkSlashIcon className="size-4 text-gray-300" />
                    </div>
                    <div className="text-sm text-white">Dress Code</div>
                  </div>
                  <div className="flex items-center gap-3 font-medium">
                    <p className="text-sm text-gray-300">
                      {formData?.dressCode
                        ? formData.dressCode.split(" ").slice(0, 7).join(" ") + (formData.dressCode.split(" ").length > 7 ? "..." : "")
                        : "Keep it black if not needed"}
                    </p>

                    <PencilSquareIcon onClick={() => handleOpenPopup("dressCode")} className="cursor-pointer size-6 text-gray-300 mr-1" />
                  </div>
                </div>
              </div>
              {popupState.isOpen && (
                <Modal
                  title={`Add ${popupState.field}`}
                  value={formData[popupState.field]}
                  onSave={handleSavePopup}
                  onClose={handleClosePopup}
                />
              )}

              <div>
                {loading && <p className="text-center mt-2 text-white"><span className="loading loading-dots loading-lg"></span></p>}
                {message.text && (
                  <p className={`text-center mt-4 ${message.type === "error" ? "text-red-500" : "text-green-500"}`}>
                    {message.text}
                  </p>
                )}
                <div disabled={loading} onClick={handleSubmit} className="bg-white p-3 rounded-md mt-8 hover:bg-slate-200 cursor-pointer">
                  <p className="text-[#0f2a57] text-sm text-center font-semibold">{loading ? "Creating Event..." : "Create Event"}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventForm;
