import { all, call, fork, take, put } from 'redux-saga/effects';
import axios from 'axios';

function logInAPI() {
  return axios.post('/api/login', data);
} // 이 함수는 generator아니다

function* logIn(action) {
  try {
    const result = yield call(logInAPI, action.data);
    yield put({
      type: 'LOG_IN_SUCCESS',
      data: result.data //  성공결과는 result.data에 있다.
    });
  } catch (err) {
    yield put({
      type: 'LOG_IN_FAILURE',
      data: err.response.data, // 실패결과는 err.response.data에 있다.
    });
  }
}

function logOutAPI() {
  return axios.post('/api/logout')
}

function* logOut() {
  try {
    const result = yield call(logOutAPI);
    yield put({
      type: 'LOG_OUT_SUCCESS',
      data: result.data
    });
  } catch (err) {
    yield put({
      type: 'LOG_OUT_FAILURE',
      data: err.response.data,
    });
  }
}

function addPostAPI(action) {
  return axios.post('/api/post', data)
}

function* addPost() {
  try {
    const result = yield call(addPostAPI, action.data);
    yield put({
      type: 'ADD_POST_SUCCESS',
      data: result.data
    });
  } catch (err) {
    yield put({
      type: 'ADD_POST_FAILURE',
      data: err.response.data,
    });
  }
}

function* watchLogin() {
  yield take('LOG_IN_REQUEST', logIn);
}

function* watchLogOut() {
  yield take('LOG_OUT_REQUEST', logOut);
}

function* watchAddPost() {
  yield take('ADD_POST_REQUEST', addPost);
}

export default fuction* rootSaga() {
  yield all([
    fork(watchLogin),
    fork(watchLogOut),
    fork(watchAddPost), // call과는 다르다.
  ]);
}