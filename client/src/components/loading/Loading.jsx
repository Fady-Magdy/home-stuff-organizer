import React, { useEffect } from "react";
import "./loading.scss";
const Loading = () => {
  function getCirclePieces() {
    let piecesArray = [];
    for (let i = 0; i < 10; i++) {
      piecesArray.push(
        <div key={i} className="loading-circle-piece">
          <span className="piece-inside"></span>
        </div>
      );
    }
    let allPiecesBoxes = document.querySelectorAll(".loading-circle-piece");

    allPiecesBoxes.forEach((piece, index) => {
      piece.style.rotate = `calc(${index} * -36deg)`;
      piece.style.opacity = 1 - 0.11 * index;
    });
    return piecesArray;
  }
  let currentColor = 0;
  function animatePieces() {
    let colors = ["green", "purple", "blue", "red", "orange", "cyan"];

    let allPieces = document.querySelectorAll(".piece-inside");
    let timeOut = 0;
    allPieces.forEach((piece, index) => {
      setTimeout(() => {
        piece.style.backgroundColor = colors[currentColor];
        piece.style.scale = 1 - 0.04 * index;
      }, timeOut);
      timeOut += 100;
    });
    timeOut = 0;
    setTimeout(() => {
      animatePieces();
      if (currentColor >= colors.length - 1) currentColor = 0;
      else currentColor += 1;
    }, 1000);
  }

  useEffect(() => {
    animatePieces();
  }, []);
  return (
    <div className="loading">
      <div className="circle">{getCirclePieces()}</div>
    </div>
  );
};

export default Loading;
