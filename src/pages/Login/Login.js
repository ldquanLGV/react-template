import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { loginFlow } from "./action";

const Login = () => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.loading["LOGIN"]);

  useEffect(() => {
    const callback = (isError, data) => {
      if (isError) return;
    };
    dispatch(
      loginFlow.request({
        params: {
          email: "eve.holt@reqres.in",
          password: "cityslicka",
        },
        callback,
      })
    );
  }, [dispatch]);

  return <div>Login {loading ? "loading..." : ""}</div>;
};

export default Login;
