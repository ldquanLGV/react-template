import { all, fork } from "redux-saga/effects";

import * as loginSaga from "@/pages/Login/saga";

export default function* rootSaga() {
  yield all(Object.values(loginSaga).map(item => fork(item)));
}
