import React from "react";

const Cell = ({ type }) => {
  const colors = {
    I: "cyan",
    O: "yellow",
    T: "purple",
    L: "orange",
    J: "blue",
    S: "green",
    Z: "red",
  };

  const cellType = typeof type === "object" ? type.type : type;
  const cellColor = typeof type === "object" ? type.color : colors[cellType];

  const isFilled = cellType && cellType !== "0";

  return (
    <div
      className={`cell ${isFilled ? "filled" : ""}`}
      style={{
        backgroundColor: isFilled ? cellColor : "transparent",
      }}
    ></div>
  );
};

export default Cell;
