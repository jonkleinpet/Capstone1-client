import React from "react";
import { Route, Redirect } from "react-router-dom";
import TokenService from "../../services/token-service";

function AdminRoute({ component, ...props }) {
  const Component = component;
  return (
    <Route
      {...props}
      render={componentProps =>
        !TokenService.isAdmin() ? (
          <Redirect to={"/"} />
        ) : (
          <Component {...componentProps} />
        )
      }
    />
  );
}

export default AdminRoute;
