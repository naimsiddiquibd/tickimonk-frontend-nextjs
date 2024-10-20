"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { fetchEvent } from "@/utils/actions/fetchEvent";
import { fetchUserById } from "@/utils/actions/fetchUserById";
import { CalendarIcon, MapPinIcon } from "@heroicons/react/24/outline";
import emailjs from "emailjs-com";
import { Inria_Sans } from "next/font/google";

const Inria = Inria_Sans({
  weight: ["300", "400", "700"],
  subsets: ["latin"],
});

const Page = ({ params }) => {
  const { id } = params;
  const [event, setEvent] = useState(null);
  const [organizerName, setOrganizerName] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const getEvent = async () => {
      try {
        const result = await fetchEvent({ id });
        if (result.success) {
          setEvent(result.data);

          // Fetch Organizer Name
          const organizer = result?.data?.organizer;
          const userResult = await fetchUserById({ userId: organizer });
          if (userResult.success) {
            setOrganizerName(userResult.data.name);
          } else {
            setError("Failed to fetch the organizer.");
          }
        } else {
          setError("Failed to fetch the event.");
        }
      } catch (err) {
        setError("An error occurred while fetching the event.");
      }
      setLoading(false);
    };

    if (id) {
      getEvent();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-slate-100">
        <p>Loading...</p>
      </div>
    );
  }
  if (error) return <p>{error}</p>;
  if (!event) return <p>No event found.</p>;

  // Handle opening and closing of the popup
  const handleOpenPopup = () => {
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  // Handle email submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // EmailJS configuration
    const templateParams = {
      eventId: id,
      message: message,
      to_email: "naimsiddiquibd@gmail.com", // Your email
    };

    emailjs
      .send(
        "service_2rb2ejc", // Replace with your EmailJS service ID
        "template_eettkwp", // Replace with your EmailJS template ID
        templateParams,
        "mJQvvf3KThRK9WkQX" // Replace with your EmailJS user ID
      )
      .then(
        (response) => {
          console.log("SUCCESS!", response.status, response.text);
          alert("Modification request sent successfully!");
          handleClosePopup();
        },
        (err) => {
          console.log("FAILED...", err);
          alert("Failed to send the request. Please try again.");
        }
      );
  };

  return (
    <div>
      <div className="lg:mx-28 mx-5 2xl:mx-96 lg:h-screen h-full pt-32 lg:px-28 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-5 lg:gap-7 gap-5">
          <div className="bg-[#261E62] p-4 rounded-md lg:col-span-2 max-h-80">
            <div className="h-[180px] lg:h-[215px] w-full">
              <Image
                src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/${event.thumbnail}`}
                width={500}
                height={500}
                alt="Event Image"
                className="object-cover w-full h-full"
              />
            </div>
            <div className="flex justify-start items-center gap-2 mt-5">
              <div className="w-12 h-12">
                <Image
                  src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/${event.eventLogo}`}
                  width={500}
                  height={500}
                  alt="Event Image"
                  className="object-cover w-full h-full rounded-sm"
                />
              </div>
              <p
                className={`text-white font-bold text-xl ${Inria.className} style={{ fontWeight: 700 }}`}
              >
                {event?.eventName}
              </p>
            </div>
          </div>
          <div className="lg:col-span-3">
            <div className="gap-0 rounded-b-md">
              <h2
                className={`text-gray-800 font-bold text-4xl uppercase ${Inria?.className} style={{ fontWeight: 700 }}`}
              >
                {event?.eventName}
              </h2>
              <p className="text-[#373737] text-lg mb-5">@ {organizerName}</p>
              <div className="flex items-center gap-1 mt-2">
                <CalendarIcon className="size-6 stroke-2 text-[#373737]" />
                <p
                  className={`text-[#373737] font-bold text-lg ${Inria?.className} style={{ fontWeight: 700 }}`}
                >
                  {new Date(event.startDateTime).toLocaleString()}
                </p>
              </div>
              <div className="flex items-center gap-1 mt-1">
                <MapPinIcon className="size-6 stroke-2 text-[#373737]" />
                <p className="text-lg  text-[#373737]">{event?.venue}</p>
              </div>
              <div className="card-actions justify-between items-center bg-gray-200 rounded-sm mt-5 py-[10px] px-[10px]">
                <p
                  className={`text-gray-800 font-bold text-2xl ${Inria.className} style={{ fontWeight: 700 }}`}
                >
                  3232 BDT
                </p>
                <button
                  className={`bg-gray-800 hover:bg-gray-950 text-white py-1 px-3 rounded-sm text-lg ${Inria.className}`}
                  onClick={handleOpenPopup}
                >
                  Ask for a Modification
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Popup form */}
      {isPopupOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg max-w-lg w-full">
            <h3 className="text-xl font-bold mb-4 text-gray-800">Ask for a Modification</h3>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <textarea
                  className="w-full p-2 border border-gray-300 rounded-md bg-slate-100"
                  placeholder="Write the changes you want..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                />
              </div>
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  className="bg-gray-400 text-white px-4 py-2 rounded-md"
                  onClick={handleClosePopup}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-red-600 text-white px-4 py-2 rounded-md"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Page;
