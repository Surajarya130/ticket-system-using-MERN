import React from "react";
import { Navigate } from "react-router-dom";

function Protected(props) {
  if (!props.isLoggedIn) {
    return <Navigate to="/login" />;
  }
  return props.children;
}

export default Protected;
