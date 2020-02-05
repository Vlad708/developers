import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  ADD_CURRENCY_EXCHANGE
} from '../contants/exchangeContants';
import { addCurrencyExchangeTracking } from '../actions';
import './CurrencyDropdown.css'

const CurrencyElements = (props) => {
  const onPress = (currencyElement) => {
    if (!props.currencyExchangeIds.includes(currencyElement[0])) {
      props.dispatch({ type: ADD_CURRENCY_EXCHANGE, id: currencyElement[0] })
    }
  }

  return props.currency.map((currencyElement) => {
    return (
      <a href="#"  key={currencyElement[0]} onClick={() => onPress(currencyElement)}>{currencyElement[1][0].name + '-' + currencyElement[1][1].name}</a>
    )
  })
}

let CurrencyDropdown =({ currency, currencyExchangeIds, dispatch }) =>  {

  return (
    currency.length !== 0 ?
    <div className="dropdown">
        <button className="dropbtn">Currrency Exchange</button>
        <div className="dropdown-content">
            <CurrencyElements currency={currency} dispatch={dispatch} currencyExchangeIds={currencyExchangeIds}/>
        </div>
    </div> : null
    )
}

const mapStateToProps = (state) => ({
  currency: state.currency,
  currencyExchangeIds: state.currencyExchangeIds
})

const mapDispatchToProps = (dispatch) => ({
  dispatch: dispatch
});

CurrencyDropdown = connect(
  mapStateToProps,
  mapDispatchToProps
)(CurrencyDropdown);

export default CurrencyDropdown;
