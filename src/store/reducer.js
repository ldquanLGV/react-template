import { combineReducers } from "redux";
import loadingReducer from "@/store/loadingReducer";

export default combineReducers({
  loading: loadingReducer
});
