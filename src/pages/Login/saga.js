import { takeLatest } from "redux-saga/effects";
import { doActionGenerator } from "@/store/action";
import { loginFlow, logoutFlow } from "@/pages/Login/action";
import Axios from "axios";

const loginService = ({ email, password }) =>
  Axios.post("https://reqres.in/api/login", {
    email,
    password,
  });

export function* loginSaga() {
  yield takeLatest(loginFlow.request, ({ payload: { params, callback } }) =>
    doActionGenerator({
      action: {
        query: params,
        params: params,
        callback: callback,
      },
      flow: loginFlow,
      apiService: loginService,
    })
  );
}

export function* logoutSaga() {
  yield takeLatest(logoutFlow.request, ({ payload }) =>
    doActionGenerator({
      action: {
        query: payload,
        params: payload,
      },
      flow: logoutFlow,
      apiService: () => new Promise((res) => res(1)),
    })
  );
}
