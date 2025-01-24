import React from "react";

const Cell = ({ type }) => {
  return (
  <div className={`cell ${type ? "filled" : ""}`}>сell</div>
  )
}

export default Cell;
