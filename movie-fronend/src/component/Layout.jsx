import React from "react";
import SearchU from "./nav/Nav";
import SortBtn from "./pages/Category/SortBtn";

export default function Layout({ children }) {
  return (
    <>
      <SearchU />
      <div
        style={{
        justifyContent: "center",
        alignContent: "center",
        }}
        className="flex"
    >
      <div
        style={{
          width: "90%",
          justifyContent: "center",
        }}
      >
        <SortBtn name={children.props.name} />
        {children}
      </div>
      </div>
    </>
  );
}
