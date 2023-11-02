// DetailedScreen.js
import React from "react";

const popupStyle = {
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  backgroundColor: "white",
  padding: "20px",
  borderRadius: "5px",
  boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.5)",
};

function DetailedScreen({ setScreenOpen, title }) {
  return (
    <div style={popupStyle}>
      <button onClick={() => setScreenOpen()}>X</button>
      <h2>{title}</h2>
      <p>팝업 내용을 여기에 추가하세요.</p>
    </div>
  );
}

export default DetailedScreen;
