import { combineReducers } from "redux";

import bookProviderReducer from "./services/reducer";

// Combine all the reducers
const rootReducer = combineReducers({
  book: bookProviderReducer,
});

export default rootReducer;

// Reducers are the ones in charge of updating the state of the app.
// Redux will automatically pass the current state of the app and the action occurred.
// It’s up to the reducer to realize if it needs to modify the state or not based on the action.type.
// That’s why almost every time our reducer will be a function containing a switch statement,
// which modifies and returns the state based on what action occurred.
// Its important that reducers never mutate the state in place,
// instead it should replace the keys that it needs to be changed.
// So if you look at all the cases, we never mutate state directly
// but instead use Object.assign which creates new object having the target fields replaced with the updated one.
