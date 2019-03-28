import React from "react";
import ReactDOM from "react-dom";
import PostForm from "../components/PostForm/PostForm";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<PostForm />, div);
  ReactDOM.unmountComponentAtNode(div);
});
