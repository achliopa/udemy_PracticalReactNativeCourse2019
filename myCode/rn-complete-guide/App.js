import React from 'react';
import { createStore, combineReducers, applyMiddleware} from 'redux';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';

import PlacesNavigator from './navigation/PlacesNavigator';
import placesReducer from './store/places-reducer';

const rootReducer = combineReducers({
    places: placesReducer    
});

export default function App() {
  return (<PlacesNavigator />);
}
