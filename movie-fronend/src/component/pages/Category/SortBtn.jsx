import React from "react";
import { useNavigate } from 'react-router-dom';

const SortBtn = ({ name }) => {
  const navigate = useNavigate();

  return (
    <div className="buttons-containor">
      <button
        className={name === "popular" ? "active popular" : "popular"}
        onClick={() => navigate("/popular/1")}
      >
        {" "}
        Popular{" "}
      </button>
      <button
        className={name === "top_rated" ? "active top" : "top"}
        onClick={() => navigate("/top_rated/1")}
      >
        {" "}
        Top rated{" "}
      </button>
      <button
        className={name === "upcoming" ? "active coming" : "coming"}
        onClick={() => navigate("/upcoming/1")}
      >
        {" "}
        Upcoming{" "}
      </button>
    </div>
  );
};

export default SortBtn;
