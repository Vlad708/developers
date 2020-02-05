import {
  ADD_CURRENCY_EXCHANGE,
  REMOVE_CURRENCY_EXCHANGE,
  SAVE_CURRENCY_CONFIGURATION,
  SAVE_CURRENT_EXCHANGE_RATES
} from '../contants/exchangeContants';

const initialState = {
  currency: [],
  currencyObject: {},
  currencyExchangeIds: [],
  currencyRates: { rates: [] },
  olderCurrencyRates: { rates: []}
}

const reducer = (state = { ...initialState }, action) => {
  switch (action.type) {
    case SAVE_CURRENCY_CONFIGURATION: 
      return {
        ...state,
        currency: action.currency,
        currencyObject: action.currencyObject
      }
    case REMOVE_CURRENCY_EXCHANGE:
      return {
        ...state,
        currencyExchangeIds: [...action.currencyExchangeIds]
      }
    case ADD_CURRENCY_EXCHANGE:
      return {
        ...state,
        currencyExchangeIds: [...state.currencyExchangeIds, action.id]
      }
    case SAVE_CURRENT_EXCHANGE_RATES:
      return {
        ...state,
        currencyRates: action.currencyRates,
        olderCurrencyRates: action.olderCurrencyRates
      }
    default:
      return state;
  }
};

export default reducer;
