import { all } from "redux-saga/effects";
import { roleWatcher } from "../features/role/roleSaga";
import { portalWatcher } from "../features/portal/portalSaga";

export function* rootSaga() {
  yield all([
    roleWatcher(),
    portalWatcher()
  ]);
}