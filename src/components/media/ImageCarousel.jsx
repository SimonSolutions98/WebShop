import { useState, useEffect } from "react";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import { motion, AnimatePresence } from "framer-motion";

export default function ImageCarousel({ images = [], alt = "", className = "" }) {
  const [[currentImage, direction], setCurrentImage] = useState([0, 0]);

  useEffect(() => {
    const nextIndex = (currentImage + 1) % images.length;
    const prevIndex = (currentImage - 1 + images.length) % images.length;

    [nextIndex, prevIndex].forEach((index) => {
      const img = new Image();
      img.src = images[index];
    });
  }, [currentImage, images]);

  const handleNext = () => {
    setCurrentImage(([prev]) => [(prev + 1) % images.length, 1]);
  };

  const handlePrev = () => {
    setCurrentImage(([prev]) => [(prev - 1 + images.length) % images.length, -1]);
  };

  const handleDotClick = (index) => {
    if (index === currentImage) return;
    setCurrentImage(([prev]) => [index, index > prev ? 1 : -1]);
  };

  const variants = {
    enter: (direction) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.25 },
    },
    exit: (direction) => ({
      x: direction < 0 ? 300 : -300,
      opacity: 0,
      transition: { duration: 0.15 },
    }),
  };

  return (
    <div className={`relative w-full h-full overflow-hidden ${className}`}>
      <AnimatePresence custom={direction} mode="wait">
        <motion.img
          key={currentImage}
          src={images[currentImage]}
          alt={`${alt} ${currentImage + 1}`}
          className="absolute top-0 left-0 w-full h-full object-cover rounded-lg"
          custom={direction}
          initial="enter"
          animate="center"
          exit="exit"
          variants={variants}
        />
      </AnimatePresence>

      {/* Prev Button */}
      <button
        onClick={handlePrev}
        className="absolute left-3 top-1/2 -translate-y-1/2
                   p-2 flex items-center justify-center cursor-pointer
                   rounded-full bg-black/30 backdrop-blur-sm
                   transition-all duration-200 hover:-translate-x-0.5"
      >
        <MdChevronLeft className="text-white w-10 h-10" />
      </button>

      {/* Next Button */}
      <button
        onClick={handleNext}
        className="absolute right-3 top-1/2 -translate-y-1/2
                   p-2 flex items-center justify-center cursor-pointer
                   rounded-full bg-black/30 backdrop-blur-sm
                   transition-all duration-200 hover:translate-x-0.5"
      >
        <MdChevronRight className="text-white w-10 h-10" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex justify-center items-center gap-2 px-3 py-2 rounded-full bg-black/30 backdrop-blur-sm">
        {images.map((_, idx) => (
          <span
            key={idx}
            onClick={() => handleDotClick(idx)}
            className={`w-[9px] h-[9px] rounded-full cursor-pointer transition-all duration-200
              ${idx === currentImage ? "bg-highlight scale-110" : "bg-blend"}
              hover:scale-130 hover:bg-highlight/40 duration-300 easeInOut`}
          />
        ))}
      </div>
    </div>
  );
}
