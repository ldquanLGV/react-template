import React, { useEffect } from "react";
import { loginFlow } from "./action";
import { useDispatch, useSelector } from "react-redux";

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
