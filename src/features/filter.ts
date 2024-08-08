import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Status, Todo } from '../types';

interface State {
  query: string;
  status: Status;
}

const initialState: State = {
  query: '',
  status: 'all',
};

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    changeStatus(state: State, { payload }: PayloadAction<Status>) {
      return {
        ...state,
        status: payload,
      };
    },
    changeQuary(state: State, { payload }: PayloadAction<string>) {
      return {
        ...state,
        query: payload,
      };
    },
  },
});

export const { changeQuary, changeStatus } = filterSlice.actions;

export const filtredTodos = (todos: Todo[], filter: State) => {
  const filtred = todos.filter(todo =>
    todo.title.toLowerCase().trim().includes(filter.query.toLowerCase().trim()),
  );

  switch (filter.status) {
    case 'active':
      return filtred.filter(todo => todo.completed === false);
    case 'completed':
      return filtred.filter(todo => todo.completed === true);
    case 'all':
      return [...filtred];
    default:
      return filtred;
  }
};