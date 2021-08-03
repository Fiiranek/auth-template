import Utils from "../../utils/Utils";

export const session = (state = false, action) => {
  switch (action.type) {
    case "LOGIN":
      Utils.saveToken(action.token);
      state = true;
      return state;
    case "LOGOUT":
      Utils.clearToken();
      state = false;
      return state;
    default:
      return state;
  }
};
