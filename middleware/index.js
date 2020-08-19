import { Middleware } from 'redux';

export const storeMiddleWare = (store) => (next) => (action) => {
  return next({ ...action, getState: store.getState });
};
