import React, { useState } from 'react';
import './ImageSlider.css';
   
  const slideStyles = {
    width: "100%",
    height: "100%",
    borderRadius: "10px",
    backgroundSize: "cover",
    backgroundPosition: "center",
    boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px"
  };
  
  const sliderStyles = {
    position: "relative",
    height: "100%",
    width: 'auto'
  };
  
  const ImageSlider = () => {
  
    const slides = [
      {url: `${process.env.REACT_APP_FRONTEND_URL}/rules1.png`, title: 'Uno-rules-graphic1'},
      {url: `${process.env.REACT_APP_FRONTEND_URL}/rules2.png`, title: 'Uno-rules-graphic2'},
      {url: `${process.env.REACT_APP_FRONTEND_URL}/rules3.png`, title: 'Uno-rules-graphic3'},
      {url: `${process.env.REACT_APP_FRONTEND_URL}/rules4.png`, title: 'Uno-rules-graphic4'},
      {url: `${process.env.REACT_APP_FRONTEND_URL}/rules5.png`, title: 'Uno-rules-graphic5'},
      {url: `${process.env.REACT_APP_FRONTEND_URL}/rules6.png`, title: 'Uno-rules-graphic6'},
      {url: `${process.env.REACT_APP_FRONTEND_URL}/rules7.png`, title: 'Uno-rules-graphic7'}
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
    const slideStylesWithBackground = {
      ...slideStyles,
      backgroundImage: `url(${slides[currentIndex].url})`,
      width: '100%'
    };
  
    return (
        <div style={sliderStyles}>
          <div>
            <div onClick={goToPrevious} className='leftArrowStyles'>
              ❰
            </div>
            <div onClick={goToNext} className='rightArrowStyles'>
              ❱
            </div>
          </div>
          <div style={slideStylesWithBackground}></div>
        </div>
    );
  };

export default ImageSlider;