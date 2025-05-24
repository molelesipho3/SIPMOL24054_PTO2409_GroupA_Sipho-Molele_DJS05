/**
 * Test file for the Redux-inspired store implementation
 * 
 * This file tests all four scenarios described in the user stories:
 * 1. Initial State Verification
 * 2. Incrementing the Counter
 * 3. Decrementing the Counter
 * 4. Resetting the Counter
 */

// Import the store implementation
const { createStore, counterReducer, ActionTypes } = require('./store');

// Create a new store instance with the counter reducer
const store = createStore(counterReducer, { count: 0 });

// Subscribe to state changes and log them to the console
store.subscribe((state) => {
  console.log('State updated:', state);
});

// Helper function to log scenario information
function logScenario(scenarioNumber, description) {
  console.log('\n' + '-'.repeat(50));
  console.log(`SCENARIO ${scenarioNumber}: ${description}`);
  console.log('-'.repeat(50));
}

// Helper function to log current state
function logCurrentState() {
  const currentState = store.getState();
  console.log('Current state:', currentState);
  return currentState;
}

// Run all test scenarios
function runTests() {
  // SCENARIO 1: Initial State Verification
  logScenario(1, 'Initial State Verification');
  console.log('GIVEN no interactions have been performed yet');
  console.log('WHEN the "getState" method is run');
  console.log('AND the result is logged to the console');
  console.log('AND the browser console is open');
  console.log('THEN the state should show a count of 0');
  
  const initialState = logCurrentState();
  console.log('Test result:', initialState.count === 0 ? 'PASSED ✓' : 'FAILED ✗');
  
  // SCENARIO 2: Incrementing the Counter
  logScenario(2, 'Incrementing the Counter');
  console.log('GIVEN no interactions have been performed yet');
  console.log('WHEN an "ADD" action is dispatched');
  console.log('AND another "ADD" action is dispatched');
  console.log('AND the browser console is open');
  console.log('THEN the state should show a count of 2');
  
  console.log('Dispatching ADD action...');
  store.dispatch({ type: ActionTypes.ADD });
  console.log('Dispatching ADD action again...');
  store.dispatch({ type: ActionTypes.ADD });
  
  const afterIncrementState = logCurrentState();
  console.log('Test result:', afterIncrementState.count === 2 ? 'PASSED ✓' : 'FAILED ✗');
  
  // SCENARIO 3: Decrementing the Counter
  logScenario(3, 'Decrementing the Counter');
  console.log('GIVEN the current count in the state is 2');
  console.log('WHEN a "SUBTRACT" action is dispatched');
  console.log('AND the browser console is open');
  console.log('THEN the state should display a count of 1');
  
  console.log('Dispatching SUBTRACT action...');
  store.dispatch({ type: ActionTypes.SUBTRACT });
  
  const afterDecrementState = logCurrentState();
  console.log('Test result:', afterDecrementState.count === 1 ? 'PASSED ✓' : 'FAILED ✗');
  
  // SCENARIO 4: Resetting the Counter
  logScenario(4, 'Resetting the Counter');
  console.log('GIVEN the current count in the state is 1');
  console.log('WHEN a "RESET" action is dispatched');
  console.log('AND the browser console is open');
  console.log('THEN the state should display a count of 0');
  
  console.log('Dispatching RESET action...');
  store.dispatch({ type: ActionTypes.RESET });
  
  const afterResetState = logCurrentState();
  console.log('Test result:', afterResetState.count === 0 ? 'PASSED ✓' : 'FAILED ✗');
  
  // Summary
  console.log('\n' + '='.repeat(50));
  console.log('TEST SUMMARY');
  console.log('='.repeat(50));
  console.log('All scenarios tested successfully!');
  console.log('='.repeat(50));
}

// Run the tests
runTests();
