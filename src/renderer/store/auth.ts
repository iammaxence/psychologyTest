import { createSlice } from '@reduxjs/toolkit';
import { Dispatch } from 'redux';

interface InitalStateType {
  user: null | number;
}

const initialState: InitalStateType = {
  user: null,
};

const slice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action) => {
      return Object.assign({}, state, { user: action.payload });
    },
  },
});

export default slice.reducer;

export const isAuthSelector = (state: any) => state.auth.user !== null;

export const getUserSelector = (state: any) => state.auth.user;

export function login(id: number): any {
  return function (dispatch: Dispatch) {
    dispatch(slice.actions.setUser(id));
  };
}
