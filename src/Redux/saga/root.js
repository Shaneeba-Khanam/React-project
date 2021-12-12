import {takeEvery} from 'redux-saga/effects'
import { loginHandler,managerHandler } from './handlers'


export function* rootSaga(){
    yield takeEvery("LOGIN_ACTION",loginHandler)
    yield takeEvery("Action",managerHandler)

}