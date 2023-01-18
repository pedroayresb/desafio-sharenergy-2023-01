import React from "react";
import { Link } from "react-router-dom";


function GoBackButton() {
  return (
    <div className="flex-line justify-self-end mr-3 text-dark-blue">
      <Link to="/login">Go Back</Link>
    </div>
  );
}

export default GoBackButton;