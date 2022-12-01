import React, { useRef, useContext } from "react";
import { UnoContext } from "../UnoContext";


export const UnoModal = () => {
  const { setUnoModal, announcedUno } = useContext(UnoContext);
  const modalRef = useRef();
  const closeModal = (e) => {
    if (e.target === modalRef.current) {
      setUnoModal(false);
    }
  };

  return (
    <div className="container--modal unoModal" onClick={closeModal}>
      <div className="modal">
        <h2>UNO clicked!</h2>
        <p>PLAYER {announcedUno.player} has one card remaining!</p>
      </div>
    </div>
  );
};