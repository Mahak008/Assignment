"use client"; 

import { useState } from "react";
import cardData from "./CardContent";
import Image from "next/image";
import "../../app/css/styles.css";

const Card = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const visibleFrames = 4;

  const handleNext = () => {
    if (currentIndex < cardData.length - 1) {
      setCurrentIndex((prevIndex) => prevIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prevIndex) => prevIndex - 1);
    }
  };

  const startFrameIndex = Math.floor(currentIndex / visibleFrames) * visibleFrames;
  const endFrameIndex = Math.min(startFrameIndex + visibleFrames, cardData.length);

  // Determine if the frames should slide
  const shouldSlide = currentIndex + visibleFrames < cardData.length;

  return (
    <div className="flex flex-col md:flex-row items-center justify-center w-full h-screen px-4">
      {/* Card Section */}
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

      {/* Text and Navigation Section */}
      <div className="flex flex-col items-start md:ml-10 mt-6 md:mt-0 px-4 mx-4">
        <h2 className="text-2xl md:text-3xl font-bold text-black text-center md:text-left">
          Real Stories, Real Success
        </h2>

        <p className="text-lg mt-2 text-gray-400 text-center md:text-left">
          Discover what our learners say about us
        </p>

        {/* Navigation Arrows and Image Frames Section */}
        <div className="flex items-center mt-4">
          <button
            onClick={handlePrev}
            className={`p-2 text-2xl text-black transition duration-300 ${currentIndex === 0 ? "opacity-50 cursor-not-allowed" : ""}`}
            disabled={currentIndex === 0}
          >
            ←
          </button>

          {/* Image Frames Slider */}
          <div className="flex overflow-hidden w-72">
            <div
              className="flex transition-transform duration-300 gap-2"
              style={{
                transform: shouldSlide
                  ? `translateX(-${(currentIndex % visibleFrames) * (100 / visibleFrames)}%)`
                  : "translateX(0)"  // Stop sliding when the last set of frames is reached
              }} 
            >
              {cardData.slice(startFrameIndex, endFrameIndex).map((card, index) => (
                <div
                  key={index}
                  className={`w-16 h-16 border rounded-lg overflow-hidden flex items-center justify-center ${
                    index + startFrameIndex === currentIndex
                      ? "border-[#db9125]"
                      : "border-gray-300"
                  }`}
                >
                  {/* Show image only for active frame */}
                  {index + startFrameIndex === currentIndex && (
                    <Image
                      src={card.imageUrl}
                      alt={card.name}
                      width={64} 
                      height={64}
                      className="object-cover transition-opacity duration-300"
                    />
                  )}
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={handleNext}
            className={`p-2 text-2xl text-black transition duration-300 ${currentIndex >= cardData.length - 1 ? "opacity-50 cursor-not-allowed" : ""}`}
            disabled={currentIndex >= cardData.length - 1}
          >
            →
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
