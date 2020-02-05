import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import CurrencyDropdown from '../containers/CurrencyDropdown'
import CurrencyList from '../containers/CurrencyList';
import { CONFIG } from '../contants/exchangeContants';

let App = ({ dispatch }) => {

  useEffect(() => {
    dispatch({ type: CONFIG });
  },[])

  return (
  <div>
    <div style={{ flex: 1, display: 'flex',justifyContent: 'center',alignItems: 'center', marginBottom: '100px'}}>
      <div>
      <CurrencyDropdown />
      </div>
    </div>
    <div style={{ flex: 1, display: 'flex',justifyContent: 'center',alignItems: 'center'}}>
      <div>
      <CurrencyList />
      </div>
    </div>
  </div>
)};


const mapDispatchToProps = (dispatch) => ({
  dispatch: dispatch
});

App = connect(
  null,
  mapDispatchToProps,
)(App);

export default App;
