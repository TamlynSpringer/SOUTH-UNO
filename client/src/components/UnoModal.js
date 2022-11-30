import React, { useRef, useContext } from "react";
import { UnoContext } from "../UnoContext";


export const UnoModal = () => {
  const { setUnoModal } = useContext(UnoContext);
  const modalRef = useRef();
  const closeModal = (e) => {
    if (e.target === modalRef.current) {
      setUnoModal(false);
    }
  };

  return (
    <div className="container--modal" onClick={closeModal}>
      <div className="modal">
        <h2>UNO clicked, player {playerOnUno.player} has one card remaining!</h2>
        <button onClick={() => setUnoModal(false)}>X</button>
      </div>
    </div>
  );
};