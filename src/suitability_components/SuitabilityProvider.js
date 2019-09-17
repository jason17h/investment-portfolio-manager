import React from 'react'
import { Provider } from 'react-redux';
import { configureSuitabilityStore } from '../store/configureStore';
import SuitabilityCalculator from './SuitabilityCalculator';

const store = configureSuitabilityStore();

const SuitabilityProvider = () => {
    return (
        <Provider store={store} >
            <SuitabilityCalculator />
        </Provider>
    )
}

export default SuitabilityProvider;