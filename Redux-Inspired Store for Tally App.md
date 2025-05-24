# Redux-Inspired Store for Tally App

This project implements a minimalistic Redux-inspired store to manage the state of a simple Tally App. The implementation focuses on core state management functionalities without UI rendering, demonstrating state changes through console logs.

## How to Run the Code

1. Ensure you have Node.js installed on your system.
2. Clone or download this repository to your local machine.
3. Navigate to the project directory in your terminal.
4. Run the test file to see the state management in action:

```bash
node test.js
```

This will execute all test scenarios and display the state changes in the console.

## Project Structure

- `store.js`: Contains the Redux-inspired store implementation with state management functions.
- `test.js`: Contains test code that demonstrates all user stories and verifies the store's functionality.
- `README.md`: This file, providing documentation and instructions.

## Approach Overview

The implementation follows the Observer pattern and functional programming principles to create a simple yet effective state management solution. Here's a breakdown of the approach:

### 1. Store Implementation

The store is implemented as a factory function (`createStore`) that takes a reducer function and an initial state. It returns an object with three main methods:

- **getState**: Returns the current state of the application.
- **dispatch**: Takes an action object and updates the state by passing the current state and action to the reducer function.
- **subscribe**: Accepts a listener function that gets called whenever the state changes, implementing the Observer pattern.

### 2. Reducer Function

The reducer is a pure function that takes the current state and an action, then returns a new state based on the action type. This follows functional programming principles by:

- Not mutating the original state (immutability)
- Returning a new state object for each action
- Having no side effects

### 3. Action Types

Action types are defined as constants to maintain consistency and prevent typos:

- `ADD`: Increments the counter
- `SUBTRACT`: Decrements the counter
- `RESET`: Resets the counter to zero

### 4. Testing

The test file demonstrates all four scenarios from the user stories:

1. Initial state verification
2. Incrementing the counter
3. Decrementing the counter
4. Resetting the counter

Each test logs the state changes to the console, making it easy to verify the store's behavior.

## Challenges and Solutions

### Challenge 1: Implementing the Observer Pattern

**Challenge**: Creating an effective subscription mechanism that notifies listeners of state changes without introducing bugs or memory leaks.

**Solution**: Implemented a subscribe method that:
- Adds listeners to an array
- Returns an unsubscribe function to remove listeners when needed
- Ensures all listeners are notified in the order they were added

### Challenge 2: Ensuring Immutability

**Challenge**: Maintaining immutability in the state updates to follow functional programming principles.

**Solution**: Used the spread operator (`...state`) to create a new state object for each action, ensuring the original state is never modified directly.

### Challenge 3: Testing Without UI

**Challenge**: Demonstrating state changes effectively without a UI.

**Solution**: Created a comprehensive test file with clear console logs that show:
- The scenario being tested
- The actions being dispatched
- The resulting state after each action
- Whether each test passed or failed

## Code Explanation

### Store Implementation (store.js)

```javascript
function createStore(reducer, initialState) {
  let state = initialState;
  const listeners = [];
  
  function getState() {
    return state;
  }
  
  function dispatch(action) {
    state = reducer(state, action);
    listeners.forEach(listener => listener(state));
    return action;
  }
  
  function subscribe(listener) {
    listeners.push(listener);
    return function unsubscribe() {
      const index = listeners.indexOf(listener);
      if (index !== -1) {
        listeners.splice(index, 1);
      }
    };
  }
  
  dispatch({ type: '@@INIT' });
  
  return {
    getState,
    dispatch,
    subscribe
  };
}
```

This implementation follows the core principles of Redux:
- The store is the single source of truth for the application state
- State can only be changed by dispatching actions
- Changes are made with pure functions (reducers)
- Subscribers are notified of all state changes

### Reducer Implementation

```javascript
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
```

The reducer handles three action types and returns a new state for each, maintaining immutability by creating a new state object rather than modifying the existing one.

## Conclusion

This implementation demonstrates a lightweight Redux-inspired state management solution that effectively handles the requirements of the Tally App. By focusing on core functionalities and following functional programming principles, the code remains clean, maintainable, and easy to understand.

The Observer pattern is effectively implemented through the subscribe method, allowing for flexible state change notifications without tight coupling between components. This approach can be extended to more complex applications by adding middleware, combining reducers, or integrating with UI frameworks.
