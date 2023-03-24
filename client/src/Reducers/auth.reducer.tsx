import Account from "../Models/Account";

export interface IReducerAction {
  type: string;
  payload?: any;
}

export interface IReducerState {
  isAuthenticated?: true | false;
  account?: Account;
}

export function authReducer(state: IReducerState, action: IReducerAction) {
  switch (action.type) {
    case "LOGIN":
      return {
        isAuthenticated: true,
        account: action.payload,
      };
    case "LOGOUT":
      return {
        isAuthenticated: false,
        account: null,
      };
    default:
      return state;
  }
}
