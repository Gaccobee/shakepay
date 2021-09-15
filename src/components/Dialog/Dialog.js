import React from "react";
import "./Dialog.css";

const Dialog = ({ title, from, amount, date }) => {
  return (
    <div className="dialog" id="lemon">
      {title}
      <hr />

      <div className="column">
        <p>From</p>
        {from}
      </div>

      <div className="column">
        <p>Amount</p>
        {amount}
      </div>

      <div className="column">
        <p>Date</p>
        {date}
      </div>
    </div>
  );
};

export default Dialog;
