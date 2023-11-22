import { combineReducers } from 'redux';

import activities from './user/reducer';

const reducers = combineReducers({
  activities
});

export default reducers;
