"use client";

import { useState } from "react";
import cardData from "./CardContent";
import Image from "next/image";
import "../../app/css/styles.css";

const Card = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    if (currentIndex < cardData.length - 1) {
      setCurrentIndex((prevIndex) => Math.min(prevIndex + 1, cardData.length - 1));
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prevIndex) => Math.max(prevIndex - 1, 0));
    }
  };

  // Determine the range of cards to display
  const currentCards = cardData.slice(Math.max(0, currentIndex - 3), currentIndex + 1);

  return (
    <div className="flex flex-col-reverse md:flex-row items-center justify-center w-full h-screen px-4">
      {/* Main Card Section */}
      <div className="relative flex flex-col border border-[#db9125] rounded-lg shadow-lg custom-gradient" style={{ width: "100%", maxWidth: "550px", height: "320px" }}>
        <div className="absolute top-4 right-4 bg-green-500 text-white font-semibold px-2 py-1 rounded z-10">
          {cardData[currentIndex].hike}
        </div>

        <div className="flex flex-row items-center mt-10 p-4">
          <div className="flex-shrink-0">
            <Image
              src={cardData[currentIndex].imageUrl}
              alt={cardData[currentIndex].name}
              width={120}
              height={120}
              className="object-cover border rounded-lg border-gray-500"
            />
          </div>

          <div className="flex flex-col ml-4">
            <h3 className="text-xl md:text-2xl text-[#db9125]">
              {cardData[currentIndex].name}
            </h3>
            <p className="text-normal md:text-xl text-white my-2">
              {cardData[currentIndex].role}
            </p>
            <p className="text-gray-200 text-xs md:text-sm">
              {cardData[currentIndex].details}
            </p>
          </div>
        </div>

        <div className="p4">
          <p className="text-2xl text-white px-4">{cardData[currentIndex].company}</p>
        </div>
      </div>

      {/* Frame Section */}
      <div className="flex flex-row ml-4 space-x-2 mb-6">
        <button onClick={handlePrev} className="text-black font-bold text-xl px-2 py-1">{"<"}</button>
        <div className="flex flex-row space-x-2 overflow-hidden" style={{ width: "400px" }}>
          {/* Display current visible cards */}
          {currentCards.map((item, index) => {
            const isActive = currentIndex === Math.max(0, currentIndex - 3) + index; // Check if it's the active card
            
            return (
              <div
                key={currentIndex - 3 + index} // Ensure unique keys for visible frames
                className={`w-20 h-20 border rounded-lg ${isActive ? "border-[#db9125]" : "border-gray-400"} ${isActive ? '' : 'filter blur-sm'}`}
                style={{ position: "relative" }}
              >
                <Image
                  src={item.imageUrl}
                  alt={item.name}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-lg"
                />
              </div>
            );
          })}
        </div>
        <button onClick={handleNext} className="text-black font-bold text-xl px-2 py-1">{">"}</button>
      </div>
    </div>
  );
};

export default Card;
