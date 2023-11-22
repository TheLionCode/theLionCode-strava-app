import { LOGOUT, SET_ACTIVITIES } from './action-types';

const initialState: any = {
  activities: [],
  permissions: null,
};

const activities = (state = initialState, { type, payload }: any) => {
  switch (type) {
    case SET_ACTIVITIES:
      return {
        ...state,
        activities: payload
      }

    case LOGOUT:
      return initialState;

    default:
      return state;
  }
};

export default activities;
