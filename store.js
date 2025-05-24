/**
 * Redux-inspired store for Tally App
 * 
 * This implementation follows the Observer pattern and functional programming principles
 * to create a simple state management solution for a counter application.
 */

/**
 * Creates a store that holds the state tree.
 * 
 * @param {Function} reducer A function that returns the next state tree given the current state and an action
 * @param {Object} initialState The initial state of the application
 * @returns {Object} A store object with getState, dispatch, and subscribe methods
 */
function createStore(reducer, initialState) {
  // The current state of the application
  let state = initialState;
  
  // Array of listener functions to be called when state changes
  const listeners = [];
  
  /**
   * Returns the current state tree
   * @returns {Object} The current state
   */
  function getState() {
    return state;
  }
  
  /**
   * Dispatches an action to change the state
   * @param {Object} action An object representing the action to perform
   * @returns {Object} The action that was dispatched
   */
  function dispatch(action) {
    // Use the reducer to calculate the new state based on current state and action
    state = reducer(state, action);
    
    // Notify all listeners about the state change
    listeners.forEach(listener => listener(state));
    
    return action;
  }
  
  /**
   * Adds a listener function to be called whenever the state changes
   * @param {Function} listener A callback function to be invoked on state changes
   * @returns {Function} A function to unsubscribe the listener
   */
  function subscribe(listener) {
    listeners.push(listener);
    
    // Return an unsubscribe function
    return function unsubscribe() {
      const index = listeners.indexOf(listener);
      if (index !== -1) {
        listeners.splice(index, 1);
      }
    };
  }
  
  // Initialize the store with a dummy action to populate the initial state
  dispatch({ type: '@@INIT' });
  
  return {
    getState,
    dispatch,
    subscribe
  };
}

// Define action types as constants to avoid typos
const ActionTypes = {
  ADD: 'ADD',
  SUBTRACT: 'SUBTRACT',
  RESET: 'RESET'
};

/**
 * Reducer function for the tally counter
 * 
 * @param {Object} state The current state
 * @param {Object} action The action to perform
 * @returns {Object} The new state
 */
function counterReducer(state = { count: 0 }, action) {
  switch (action.type) {
    case ActionTypes.ADD:
      return {
        ...state,
        count: state.count + 1
      };
    case ActionTypes.SUBTRACT:
      return {
        ...state,
        count: state.count - 1
      };
    case ActionTypes.RESET:
      return {
        ...state,
        count: 0
      };
    default:
      return state;
  }
}

// Export the store, reducer, and action types
module.exports = {
  createStore,
  counterReducer,
  ActionTypes
};
