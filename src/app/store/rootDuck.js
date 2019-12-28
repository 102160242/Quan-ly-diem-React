import { all } from "redux-saga/effects";
import { combineReducers } from "redux";

import * as auth from "./ducks/auth.duck";
import { metronic } from "../../_metronic";
import { reducer as toastrReducer } from 'react-redux-toastr';

export const rootReducer = combineReducers({
  auth: auth.reducer,
  i18n: metronic.i18n.reducer,
  builder: metronic.builder.reducer,
  toastr: toastrReducer
});

export function* rootSaga() {
  yield all([auth.saga()]);
}
