import { USER_LOGIN, COUNT_SCORE } from '../actions';

const INITIAL_STATE = {
  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
};

const player = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case USER_LOGIN:
    return {
      ...state,
      name: action.value.username,
      gravatarEmail: action.value.email,
    };
  case COUNT_SCORE:
    return {
      ...state,
      score: state.score + action.value,
      assertions: state.assertions + 1,
    };
  default:
    return state;
  }
};

export default player;
