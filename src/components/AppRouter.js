import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { privateRoutes, publicRoutes } from "../router";
import { CHAT_ROUTE } from "../utils/consts";
import { useContext } from "react";
import { Context } from "../index";
import Loader from "./Loader";
import { useAuthState } from "react-firebase-hooks/auth";

const AppRouter = () => {
  const { auth } = useContext(Context);
  const [user, loading] = useAuthState(auth);

  if (loading) {
    return <Loader />;
  }

  return (
    <Routes>
      {user ? (
        <>
          {privateRoutes.map(({ path, Component }) => (
            <Route key={path} path={path} element={<Component />} />
          ))}
          <Route path="*" element={<Navigate to={CHAT_ROUTE} replace />} />
        </>
      ) : (
        <>
          {publicRoutes.map(({ path, Component }) => (
            <Route key={path} path={path} element={<Component />} />
          ))}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </>
      )}
    </Routes>
  );
};

export default AppRouter;
