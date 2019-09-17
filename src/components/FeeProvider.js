import React from 'react'
import { Provider } from 'react-redux';
import { configureStore } from '../store/configureStore';
import PortfolioFeeCalculator from './PortfolioFeeCalculator';

const store = configureStore();

const FeeProvider = () => {
    return (
        <Provider store={store}>
            <PortfolioFeeCalculator />
        </Provider>
    )
}


export default FeeProvider;