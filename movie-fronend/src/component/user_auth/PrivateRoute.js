import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import Context from '../../context/Context';


const PrivateRoute = ({ children }) => {
    const { isAuth } = useContext(Context)
    return isAuth ? children : <Navigate to="/auth/log-in" />;
  }

export default PrivateRoute;