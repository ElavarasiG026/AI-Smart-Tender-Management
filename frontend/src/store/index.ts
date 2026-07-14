import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import tenderReducer from './slices/tenderSlice';
import vendorReducer from './slices/vendorSlice';
import submissionReducer from './slices/submissionSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    tender: tenderReducer,
    vendor: vendorReducer,
    submission: submissionReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
