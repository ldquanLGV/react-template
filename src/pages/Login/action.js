import { createAsyncAction } from "@/store/action";

export const actionType = {
  login: "LOGIN",
  logout: "LOGOUT",
};

export const loginFlow = createAsyncAction(actionType.login);
export const logoutFlow = createAsyncAction(actionType.logout);