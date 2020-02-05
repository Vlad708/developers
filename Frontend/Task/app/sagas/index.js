import { put, takeLatest, all, call } from 'redux-saga/effects';
import axios from 'axios';
import {
  SAVE_CURRENCY_CONFIGURATION,
  CONFIG
} from '../contants/exchangeContants';
import { endpointConfig } from '../config'


function fetchConfiguration() {
  return axios.get('http://localhost:3000/configuration');
};

function* getConfiguration() {
  try {
    const response = yield call(fetchConfiguration);
    const keys = Object.keys(response.data.currencyPairs);
    const currency = keys.map((id) => [id,response.data.currencyPairs[id]])
    yield put({ type: SAVE_CURRENCY_CONFIGURATION, currency: currency, currencyObject: response.data.currencyPairs});
  } catch(error) {
    console.log(error)
  }
}

function* actionGetConfigurationWatcher() {
  yield takeLatest(CONFIG, getConfiguration)
}

export default function* rootSaga() {
  yield all([
    actionGetConfigurationWatcher()
  ]);
}
