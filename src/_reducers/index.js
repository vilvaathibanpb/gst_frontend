import { combineReducers } from 'redux';

import { authentication, otp_generation } from './authentication.reducer';
import { registration } from './registration.reducer';
import { users } from './users.reducer';
import { alert } from './alert.reducer';

const rootReducer = combineReducers({
  authentication,
  registration,
  users,
  alert,
  otp_generation
});

export default rootReducer;