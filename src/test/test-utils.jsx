import React from 'react';
import { render } from '@testing-library/react';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import userReducer from '@/entities/user/store/userSlice';
import postReducer from '@/entities/post/store/post.slice';
import uiReducer from '@/app/store/uiSlice';

export function renderWithProviders(
  ui,
  {
    preloadedState = {},
    store = configureStore({
      reducer: { user: userReducer, post: postReducer, ui: uiReducer },
      preloadedState,
    }),
    ...renderOptions
  } = {}
) {
  function Wrapper({ children }) {
    return <Provider store={store}>{children}</Provider>;
  }
  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}
