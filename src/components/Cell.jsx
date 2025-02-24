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

  return (
    <div
      className={`cell ${type ? "filled" : ""}`}
      style={{
        backgroundColor: type && type !== "0" ? colors[type] : "transparent",
      }}
    ></div>
  );
};

export default Cell;
