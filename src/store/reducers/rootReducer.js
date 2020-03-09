const initialState = {
  counter: 100000,
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD':
      return {
        counter: state.counter + 1
      };
    case 'SUB':
      return {
        counter: state.counter - 1
      };

    case 'RND':
      return {
        counter: state.counter + action.payload
      };
    default:
      return state;
  }
};

export default rootReducer;
