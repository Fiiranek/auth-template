import { session } from "./session";

import { combineReducers } from "redux";

export const allReducers = combineReducers({
  session: session,
});
