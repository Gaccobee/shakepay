import React from "react";
import "./Row.css";

const Row = ({ asset, onClick, label, subtitle, value, valueClassName }) => {
  return (
    <div onClick={onClick} className="container">
      <div className="assetLabelContainer">
        {asset && (
          <img className="asset" src={asset} alt={`Logo for ${label}`} />
        )}
        <div className="labelContainer" >
          <span className="label">{label}</span>
          <span className="subtitle">{subtitle}</span>
        </div>
      </div>
      <span className={`label ${valueClassName}`}>{value}</span>
    </div>
  );
};

export default Row;
