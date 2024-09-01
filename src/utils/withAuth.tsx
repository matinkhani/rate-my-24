import { NextPage } from "next";
import React from "react";
import RegisterPage from "../app/auth/register/page";

type WithAuthProps = {
  isLoggedIn: boolean;
};

const withAuth = <P extends object>(Component: NextPage<P>) => {
  const Auth: NextPage<P & WithAuthProps> = (props) => {
    const isLoggedIn = localStorage.getItem("token");

    if (!isLoggedIn) {
      return <RegisterPage />;
    }

    return <Component {...props} />;
  };

  return;
};

export default withAuth;
