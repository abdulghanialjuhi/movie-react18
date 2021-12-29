import React from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div
      style={{
        height: "80vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        color: "#fff",
      }}
    >
      <div>
        <h1>Sorry</h1>
        <p>We couldn't find this page 404</p>
        <Link to="/popular/1"> Go to home page </Link>
      </div>
    </div>
  );
}
