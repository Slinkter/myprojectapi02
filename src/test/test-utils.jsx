import { render, renderHook } from '@testing-library/react';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import PropTypes from 'prop-types';
import userReducer from '@/entities/user/store/userSlice';
import postReducer from '@/entities/post/store/post.slice';
import uiReducer from '@/app/store/uiSlice';

export const createMockStore = (preloadedState = {}) => {
  return configureStore({
    reducer: { user: userReducer, post: postReducer, ui: uiReducer },
    preloadedState,
  });
};

export function renderWithProviders(
  ui,
  {
    preloadedState = {},
    store = createMockStore(preloadedState),
    ...renderOptions
  } = {}
) {
  function Wrapper({ children }) {
    return <Provider store={store}>{children}</Provider>;
  }
  Wrapper.propTypes = {
    children: PropTypes.node.isRequired,
  };
  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}

export function renderHookWithProviders(
  hook,
  {
    preloadedState = {},
    store = createMockStore(preloadedState),
    ...renderOptions
  } = {}
) {
  function Wrapper({ children }) {
    return <Provider store={store}>{children}</Provider>;
  }
  Wrapper.propTypes = {
    children: PropTypes.node.isRequired,
  };
  return { store, ...renderHook(hook, { wrapper: Wrapper, ...renderOptions }) };
}
