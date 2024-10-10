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
      setCurrentIndex((prevIndex) =>
        Math.min(prevIndex + 1, cardData.length - 1)
      );
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prevIndex) => Math.max(prevIndex - 1, 0));
    }
  };

  // Determine the range of cards to display
  const start = Math.max(0, currentIndex - 3);
  const currentCards = cardData.slice(start, start + visibleFrames);

  const handleImageClick = (index) => {
    setCurrentIndex(start + index);
  };

  return (
    <div className="flex flex-col-reverse md:flex-row items-center justify-center w-full h-screen overflow-x-hidden px-4">
      {/* Main Card Section */}
      <div
        className="relative flex flex-col border border-[#db9125] rounded-lg shadow-lg custom-gradient"
        style={{ width: "100%", maxWidth: "550px", height: "320px" }}
      >
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
            <p className="text-gray-200 text-xs md:text-sm text-justify">
              {cardData[currentIndex].details}
            </p>
          </div>
        </div>
        <div className="p4">
          <p className="text-2xl text-white px-4">
            {cardData[currentIndex].company}
          </p>
        </div>
      </div>

      {/* Frame Section */}
      <div className="flex flex-col items-start md:ml-10 mt-6 md:mt-0 px-4 mx-4 mb-6">
        <h2 className="text-2xl md:text-3xl bg-clip-text text-transparent bg-gradient-to-r from-[#0e0e0e] via-[#3a2c15] to-[#3e2a0c] font-bold text-center md:text-left m-auto md:mt-2 md:mb-4">
          Real Stories, Real Success
        </h2>
        <p className="text-lg m-auto md:mt-2 md:mb-4 my-6 text-gray-400 text-center md:text-left">
          Discover what our learners say about us
        </p>

        <div className="flex items-center">
          <button
            onClick={handlePrev}
            className="text-black font-bold text-xl px-2 py-1"
            style={{ visibility: currentIndex > 0 ? "visible" : "hidden" }}
          >
            {"←"}
          </button>

          <div
            className="flex flex-row overflow-x-auto no-scrollbar space-x-2"
            style={{ width: "100%", maxWidth: "360px" }}
          >
            {currentCards.map((item, index) => {
              const cardIndex = start + index;
              const isActive = cardIndex === currentIndex;
              return (
                <div
                  key={cardIndex}
                  className={`w-20 h-20 border rounded-lg ${
                    isActive ? "border-[#db9125]" : "border-gray-400"
                  } ${isActive ? "" : "filter blur-sm"}`}
                  style={{ position: "relative" }}
                  onClick={() => handleImageClick(index)}
                >
                  <Image
                    src={item.imageUrl}
                    alt={item.name}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-lg cursor-pointer"
                  />
                </div>
              );
            })}
          </div>

          <button
            onClick={handleNext}
            className="text-black font-bold text-xl px-2 py-1"
            style={{
              visibility:
                currentIndex < cardData.length - 1 ? "visible" : "hidden",
            }}
          >
            {"→"}
          </button>
        </div>

        <div className="flex mt-8 mx-auto">
          <div className="w-36 gap-2 md:w-52 flex md:gap-4">
            <span className="text-[#db9125] font-bold text-3xl">
              9<sup className="">K+</sup>
            </span>
            <span className="text-gray-400 text-md">Successful Career Transitions</span>
          </div>

          <span className="text-gray-400 text-6xl font-normal">|</span>

          <div className="w-36 md:w-52 md:ml-4 flex md:gap-4">
            <span className="text-[#db9125] font-extrabold text-2xl">
              175%
            </span>
            <span className="text-gray-400 text-md">Average Salary Hike</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
