import React, { useState } from 'react';
   
  const slideStyles = {
    width: "100%",
    height: "100%",
    borderRadius: "10px",
    backgroundSize: "cover",
    backgroundPosition: "center",
    boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px"
  };
  
  const rightArrowStyles = {
    position: "absolute",
    top: "50%",
    transform: "translate(0, -50%)",
    right: "32px",
    fontSize: "45px",
    color: "#fff",
    zIndex: 1,
    cursor: "pointer",
  };
  
  const leftArrowStyles = {
    position: "absolute",
    top: "50%",
    transform: "translate(0, -50%)",
    left: "32px",
    fontSize: "45px",
    color: "#fff",
    zIndex: 1,
    cursor: "pointer",
  };
  
  const sliderStyles = {
    position: "relative",
    height: "100%",
    width: 'auto'
  };
  
  const dotsContainerStyles = {
    display: "flex",
    justifyContent: "center",
  };
  
  const dotStyle = {
    margin: "0 3px",
    cursor: "pointer",
    fontSize: "20px",
  };
  
  const ImageSlider = () => {
  
    const slides = [
      {url: 'http://localhost:3001/rules1.png', title: 'Uno-rules-graphic1'},
      {url: 'http://localhost:3001/rules2.png', title: 'Uno-rules-graphic2'},
      {url: 'http://localhost:3001/rules3.png', title: 'Uno-rules-graphic3'},
      {url: 'http://localhost:3001/rules4.png', title: 'Uno-rules-graphic4'}
    ];
    
    const [currentIndex, setCurrentIndex] = useState(0);
    const goToPrevious = () => {
      const isFirstSlide = currentIndex === 0;
      const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
      setCurrentIndex(newIndex);
    };
    const goToNext = () => {
      const isLastSlide = currentIndex === slides.length - 1;
      const newIndex = isLastSlide ? 0 : currentIndex + 1;
      setCurrentIndex(newIndex);
    };
    const goToSlide = (slideIndex) => {
      setCurrentIndex(slideIndex);
    };
    const slideStylesWidthBackground = {
      ...slideStyles,
      backgroundImage: `url(${slides[currentIndex].url})`,
      width: '100%'
    };
  
    return (
        <div style={sliderStyles}>
          <div>
            <div onClick={goToPrevious} style={leftArrowStyles}>
              ❰
            </div>
            <div onClick={goToNext} style={rightArrowStyles}>
              ❱
            </div>
          </div>
          <div style={slideStylesWidthBackground}></div>
          <div style={dotsContainerStyles}>
            {slides.map((slide, slideIndex) => (
              <div
                style={dotStyle}
                key={slideIndex}
                onClick={() => goToSlide(slideIndex)}
              >
                ●
              </div>
            ))}
          </div>
        </div>
    );
  };

export default ImageSlider;