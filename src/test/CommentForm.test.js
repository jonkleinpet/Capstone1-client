import React from "react";
import ReactDOM from "react-dom";
import CommentForm from "../components/Comments/CommentsForm";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<CommentForm />, div);
  ReactDOM.unmountComponentAtNode(div);
});
