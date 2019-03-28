import React from "react";
import ReactDOM from "react-dom";
import { MemoryRouter } from 'react-router-dom';
import MainPostList from "../components/Main/MainPostList";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(
    <MemoryRouter>
      <MainPostList />
    </MemoryRouter>, div
  );
  ReactDOM.unmountComponentAtNode(div);
});
