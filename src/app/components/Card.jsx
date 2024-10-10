"use client"; // Mark this component as a Client Component

import { useState } from "react";
import cardData from "./CardContent";
import Image from "next/image";
import "../../app/css/styles.css";

const Card = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Function to handle next card
  const handleNext = () => {
    if (currentIndex + 4 < cardData.length) {
      setCurrentIndex((prevIndex) => prevIndex + 1);
    }
  };

  // Function to handle previous card
  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prevIndex) => prevIndex - 1);
    }
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-center w-full h-screen px-4">
      {/* Card Section */}
      <div
        className="relative flex flex-col border border-[#db9125] rounded-lg shadow-lg custom-gradient"
        style={{ width: "100%", maxWidth: "550px", height: "300px" }} 
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
              src={cardData[currentIndex].imageUrl}
              alt={cardData[currentIndex].name}
              width={120}
              height={120}
              className="object-cover border rounded-lg border-gray-500"
            />
          </div>

          {/* Right Text Information */}
          <div className="flex flex-col ml-4">
            <h3 className="text-xl md:text-2xl font-semibold text-[#db9125]">
              {cardData[currentIndex].name}
            </h3>
            <p className="text-base md:text-xl text-white my-2">
              {cardData[currentIndex].role}
            </p>
            <p className="text-white font-normal text-sm md:text-base">
              {cardData[currentIndex].details}
            </p>
          </div>
        </div>

        <div className="p4">
          <p className="text-2xl text-white px-4">{cardData[currentIndex].company}</p>
        </div>
      </div>

      {/* Text and Navigation Section */}
      <div className="flex flex-col items-start md:ml-10 mt-6 md:mt-0 px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-black">
          Real Stories, Real Success
        </h2>

        <p className="text-lg mt-2 text-gray-400">
          Discover what our learners say about us
        </p>

        {/* Navigation Arrows and Image Frames Section */}
        <div className="flex items-center mt-4">
          <button
            onClick={handlePrev}
            className={`p-2 text-2xl text-black transition duration-300 ${
              currentIndex === 0 ? "invisible" : ""
            }`}
          >
            ←
          </button>

          {/* Image Frames Slider */}
          <div className="flex overflow-hidden w-72">
            <div
              className="flex transition-transform duration-300 gap-2"
              style={{ transform: `translateX(-${(currentIndex * 100) / 4}%)` }} 
            >
              {cardData
                .slice(0, Math.min(cardData.length, 4))
                .map((card, index) => (
                  <div
                    key={index}
                    className={`w-16 h-16 border rounded-lg overflow-hidden flex items-center justify-center ${
                      index === currentIndex % 4
                        ? "border-[#db9125]"
                        : "border-gray-300"
                    }`}
                  >
                  
                    {index === currentIndex % 4 && (
                      <Image
                        src={card.imageUrl}
                        alt={card.name}
                        width={64} // Responsive width
                        height={64} // Responsive height
                        className="object-cover"
                      />
                    )}
                  </div>
                ))}
            </div>
          </div>

          <button
            onClick={handleNext}
            className={`p-2 text-2xl text-black transition duration-300 ${
              currentIndex >= cardData.length - 4 ? "invisible" : ""
            }`}
          >
            →
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
