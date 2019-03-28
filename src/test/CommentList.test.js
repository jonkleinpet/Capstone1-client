import React from "react";
import ReactDOM from "react-dom";
import { MemoryRouter } from 'react-router-dom';
import CommentList from "../components/Comments/CommentList";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(
    <MemoryRouter>
      <CommentList />
    </MemoryRouter> , div
  );
  ReactDOM.unmountComponentAtNode(div);
});
