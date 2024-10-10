"use client"; // Mark this component as a Client Component

import { useState } from "react";
import cardData from "./CardContent";
import Image from "next/image";
import "../../app/css/styles.css";
import profile from "../Image/profile.png"; // Default profile image

const Card = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Function to handle next card
  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % cardData.length);
  };

  // Function to handle previous card
  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? cardData.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="flex items-center justify-center w-full h-screen">
      {/* Card Section */}
      <div
        className="relative flex flex-col border border-[#db9125] rounded-lg shadow-lg custom-gradient"
        style={{ width: "550px", height: "250px" }} // Adjust height as needed
      >
        {/* Dynamic hike content */}
        <div className="absolute top-4 right-4 bg-green-500 text-white font-semibold px-2 py-1 rounded z-10">
          {cardData[currentIndex].hike}
        </div>

        {/* Image and Text Section */}
        <div className="flex flex-row items-center mt-10 p-4">
          {/* Left Image */}
          <div className="flex-shrink-0">
            <Image
              src={profile}
              alt={cardData[currentIndex].name}
              width={120}
              height={120}
              className="object-cover border rounded-lg border-gray-500"
            />
          </div>

          {/* Right Text Information */}
          <div className="flex flex-col ml-4">
            <h3 className="text-2xl font-semibold text-[#db9125]">
              {cardData[currentIndex].name}
            </h3>
            <p className="text-white text-xl my-2">
              {cardData[currentIndex].role}
            </p>
            <p className="text-white font-normal">
              {cardData[currentIndex].details}
            </p>
          </div>
        </div>
      </div>

      {/* Text and Navigation Section */}
      <div className="flex flex-col items-start ml-10">
        <h2 className="text-3xl font-bold text-black">
          Real Stories, Real Success
        </h2>

        <p className="text-lg mt-2 text-black">
          Discover what our learners say about us
        </p>

        {/* Navigation Arrows and Image Frames Section */}
        <div className="flex items-center mt-4">
          <button
            onClick={handlePrev}
            className={`p-4 text-2xl text-black transition duration-300 ${currentIndex > 0 ? '' : 'invisible'}`}
          >
            ←
          </button>

          {/* Image Frames */}
          <div className="flex space-x-2 mx-4">
            {cardData.map((card, index) => (
              <div
                key={index}
                className={`w-20 h-20 border rounded-lg overflow-hidden flex items-center justify-center ${
                  index === currentIndex ? "border-[#db9125]" : "border-gray-300"
                }`}
              >
                {index === currentIndex ? (
                  <Image
                    src={profile}
                    alt={card.name}
                    width={80}
                    height={80}
                    className="object-cover"
                  />
                ) : null}
              </div>
            ))}
          </div>

          <button
            onClick={handleNext}
            className={`p-4 text-2xl text-black transition duration-300 ${currentIndex < cardData.length - 1 ? '' : 'invisible'}`}
          >
            →
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
