import React, { useRef, useContext } from "react";
import { UnoContext } from "../UnoContext";


export const Modal = ({handleQuit}) => {
  const { scores, setShowModal } = useContext(UnoContext);
  const modalRef = useRef();
  const closeModal = (e) => {
    if (e.target === modalRef.current) {
      setShowModal(false);
    }
  };

  return (
    <div className="container--modal" ref={modalRef} onClick={closeModal}>
      <div className="modal">
        <h2>The Winner is: {scores?.user}</h2>
        <button className="btn__room" onClick={handleQuit}>End Game</button>
        <button onClick={() => setShowModal(false)}>X</button>
      </div>
    </div>
  );
};