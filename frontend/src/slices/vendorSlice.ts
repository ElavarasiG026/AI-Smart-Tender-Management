import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface VendorState {
  vendors: any[];
  currentVendor: any | null;
  loading: boolean;
  error: string | null;
}

const initialState: VendorState = {
  vendors: [],
  currentVendor: null,
  loading: false,
  error: null,
};

const vendorSlice = createSlice({
  name: 'vendor',
  initialState,
  reducers: {
    setVendors: (state, action: PayloadAction<any[]>) => {
      state.vendors = action.payload;
    },
    setCurrentVendor: (state, action: PayloadAction<any>) => {
      state.currentVendor = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const { setVendors, setCurrentVendor, setLoading, setError } = vendorSlice.actions;
export default vendorSlice.reducer;
