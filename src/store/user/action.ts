import { actionObject } from '../../utils';
import { SET_ACTIVITIES, LOGOUT } from './action-types';

export const setActivities = (data: any) => actionObject(SET_ACTIVITIES, data);
export const logout = () => actionObject(LOGOUT);
