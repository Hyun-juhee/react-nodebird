import { all, fork, put, delay, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

// function logInAPI() {
//   return axios.post('/api/login', data);
// } // 이 함수는 generator아니다

function* logIn(action) {
  try {
    console.log('saga logIn')
    // const result = yield call(logInAPI, action.data);
    yield delay(1000);
    yield put({
      type: 'LOG_IN_SUCCESS',
      data: action.data
    });
  } catch (err) {
    yield put({
      type: 'LOG_IN_FAILURE',
      data: err.response.data, // 실패결과는 err.response.data에 있다.
    });
  }
}

// function logOutAPI() {
//   return axios.post('/api/logout')
// }

function* logOut() {
  try {
    // const result = yield call(logOutAPI);
    yield delay(1000);
    yield put({
      type: 'LOG_OUT_SUCCESS',
    });
  } catch (err) {
    yield put({
      type: 'LOG_OUT_FAILURE',
      data: err.response.data,
    });
  }
}

function* watchLogIn() {
  yield takeLatest('LOG_IN_REQUEST', logIn);
}

function* watchLogOut() {
  yield takeLatest('LOG_OUT_REQUEST', logOut);
}

export default function* userSaga() {
  yield all([
    fork(watchLogIn),
    fork(watchLogOut),
    ])
}