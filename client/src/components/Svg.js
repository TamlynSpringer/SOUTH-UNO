import React, { useContext, useEffect, useState } from 'react';
import { UnoContext } from '../UnoContext';
import parse from "html-react-parser";
import "./Svg.css";
import { useDrag } from '@use-gesture/react';
import { unoBack } from '../utils/unoBack';

const Svg = () => {

  const { svgCards, fetchSVGCards } = useContext(UnoContext);

  const [cardPosition, setCardPosition ] = useState ({x: 0, y:0});
  const dragPosition = useDrag((params)=>{
    setCardPosition({
      x: params.offset[0],
      y: params.offset[1],
    })
  });

  useEffect(() => {
    fetchSVGCards();
  }, [])

  return (
    <div>
    <h2> SVG Cards</h2>

    <div className="card__front" {...dragPosition()} style={{
                        position:'relative',
                        top: cardPosition.y,
                        left: cardPosition.x,
                        touchAction: 'none',
                      }}>{unoBack}</div>

      <ul className='ul__cards'>
        {svgCards?.map(cards => {
              return (
                <li key={cards.id} className="li__cards">    
                  <div className="flip__card">
                    <div className="card__frame">
                      <div className="card__front">
                      {parse(cards.code)} 
                      </div>
                      <div className="card__back">
                      {unoBack}
                      </div>
                    </div>
                  </div>
                </li>
              )
        })}
      </ul>  
    </div>
  )
}

export default Svg



