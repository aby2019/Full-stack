import {FETCH_USER} from '../actions/types';

export default function (state = null, action) {
  console.log(action);
  switch (action.type) //switching action type of reducer
   {
     case FETCH_USER:
      return action.payload || false;
    default:
      return state;
  }
}
