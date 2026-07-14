import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface TenderState {
  tenders: any[];
  currentTender: any | null;
  loading: boolean;
  error: string | null;
}

const initialState: TenderState = {
  tenders: [],
  currentTender: null,
  loading: false,
  error: null,
};

const tenderSlice = createSlice({
  name: 'tender',
  initialState,
  reducers: {
    setTenders: (state, action: PayloadAction<any[]>) => {
      state.tenders = action.payload;
    },
    setCurrentTender: (state, action: PayloadAction<any>) => {
      state.currentTender = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    addTender: (state, action: PayloadAction<any>) => {
      state.tenders.push(action.payload);
    },
  },
});

export const { setTenders, setCurrentTender, setLoading, setError, addTender } = tenderSlice.actions;
export default tenderSlice.reducer;
