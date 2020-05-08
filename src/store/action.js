import { call, put } from "redux-saga/effects";
import { createAction } from "redux-actions";

export const createAsyncAction = (actionType) => {
  const request = `${actionType}_REQUEST`;
  const success = `${actionType}_SUCCESS`;
  const failure = `${actionType}_FAILURE`;
  return {
    request: createAction(request),
    success: createAction(success),
    failure: createAction(failure),
  };
};

export function* doActionGenerator({ apiService, action, flow }) {
  try {
    const response = yield call(
      apiService,
      { ...action.query },
      { ...action.params }
    );
    const { data } = response;
    if (!data || response.error) {
      yield put(flow.failure(response.error || null));
      executeCallback(action.callback, true, response.error);
      return;
    }
    yield put(flow.success(data, { ...action.query }, { ...action.params }));
    executeCallback(action.callback, false, {
      data: { ...data },
      query: { ...action.query },
      params: { ...action.params },
    });
  } catch (error) {
    yield put(flow.failure(error));
    executeCallback(action.callback, true, error);
  }
}

const executeCallback = (callback, isError, params) => {
  if (typeof callback === "function") callback(isError, params);
};
