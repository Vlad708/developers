import React, {Fragment, useEffect, useState} from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import {
  SAVE_CURRENT_EXCHANGE_RATES,
  REMOVE_CURRENCY_EXCHANGE
} from '../contants/exchangeContants';
import './CurrencyList.css';
import { endpoint, interval } from '../config';


const Status = (props) => {
  const STATUS = {
    GROWING: 0,
    DECLINING: 1,
    STAGNATING: 2,
    OTHER: 3
  }
  let status = 0;
  if(props.currencyRate > props.olderCurrencyRate) {
    status = STATUS.GROWING
  } else if(props.currencyRate < props.olderCurrencyRate){
    status = STATUS.DECLINING
  } else if(props.currencyRate == props.olderCurrencyRate && props.currencyRate !== undefined){
    status = STATUS.STAGNATING
  } else {
    status = STATUS.OTHER
  }
  
  switch(status) {
    case STATUS.GROWING:
      return (
        <td key={Math.random()+'statusValue'}>GROWING</td>
      );
    case STATUS.DECLINING:
      return (
        <td key={Math.random()+'statusValue'}>DECLINING</td>
      );
    case STATUS.STAGNATING:
      return (
        <td key={Math.random()+'statusValue'}>STAGNATING</td>
      );
    default:
      return (
        <td key={Math.random()+'statusValue'}> </td>
      );
  }
}

const CurrencyExchange = (props) => {
  const removeItem = (id) => {
    const currencyExchangeIdsWithoutRemovedItem = props.currencyExchangeIds.filter((exchangeId) => exchangeId !== id);
    props.dispatch({ type: REMOVE_CURRENCY_EXCHANGE, currencyExchangeIds: currencyExchangeIdsWithoutRemovedItem })
  }
  return props.currencyExchangeIds.map((id) => {
    return (
      <Fragment key={'fragment'+id}>
          <tr key={id}>
              <td key={id+'name'}>{props.currencyObject[id][0].code + '/' + props.currencyObject[id][1].code}</td>
              <td key={id+'currentValue'}>{props.currencyRates.rates[id]}</td>
              <td key={id+'trendValue'}>{props.olderCurrencyRates.rates[id]}</td>
              <Status key={id+'statusValue'} currencyRate={props.currencyRates.rates[id]} olderCurrencyRate={props.olderCurrencyRates.rates[id]}/>
              <td key={id+'eliminateRow'}><button key={'buttonRemoveItem'+id} onClick={() => removeItem(id)} /></td>
          </tr>
      </Fragment>
    );
  })
}
    

let CurrencyList =({ currency, currencyExchangeIds,currencyObject,currencyRates,olderCurrencyRates , dispatch }) =>  {
  
    const [second,setSecond] = useState(0)
      useEffect(() => {
        setTimeout(() => {
          let params = {
            currencyPairIds: currencyExchangeIds
          }
          const idArrays = Object.keys(params).map(key => {
            if (Array.isArray(params[key])) {
              return params[key].map((value) => `${key}[]=${value}`).join('&');
            }
          })
          axios.get(endpoint+'?'+idArrays).then((response) => {
            dispatch({ type: SAVE_CURRENT_EXCHANGE_RATES, currencyRates: response.data, olderCurrencyRates: currencyRates });
          }).catch((error) => {
            console.log('error', error)
          })
          setSecond(second + 1)
          
        },interval)
      },[second])
    return (
      <table key={'currencyTable'}>
        <thead key={'currencyRowHeader'}>
        <tr key={'currencyRowTitle'}>
            <th key={'currencyTitle'}>Currency</th>
            <th key={'valueTitle'}>Value</th>
            <th key={'trendTitle'}>Trend</th>
            <th key={'statusTitle'}>Status</th>
            <th key={'eliminateRowTitle'}>Elimnate</th>
        </tr>
        </thead>
        <tbody key={'currencyRowBodyList'}>
            <CurrencyExchange key={'CurrencyExchange'} 
              olderCurrencyRates={olderCurrencyRates}
              currencyRates={currencyRates}
              currencyObject={currencyObject} 
              currencyExchangeIds={currencyExchangeIds} 
              dispatch={dispatch}/>
        </tbody>
        </table>
      )
  }

const mapStateToProps = (state) => ({
    currency: state.currency,
    currencyObject: state.currencyObject,
    currencyExchangeIds: state.currencyExchangeIds,
    currencyRates: state.currencyRates,
    olderCurrencyRates: state.olderCurrencyRates
  })
  
const mapDispatchToProps = (dispatch) => ({
    dispatch: dispatch
  });
  
CurrencyList = connect(
  mapStateToProps,
  mapDispatchToProps
)(CurrencyList);
  
export default CurrencyList;