import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SubmissionState {
  submissions: any[];
  currentSubmission: any | null;
  loading: boolean;
  error: string | null;
}

const initialState: SubmissionState = {
  submissions: [],
  currentSubmission: null,
  loading: false,
  error: null,
};

const submissionSlice = createSlice({
  name: 'submission',
  initialState,
  reducers: {
    setSubmissions: (state, action: PayloadAction<any[]>) => {
      state.submissions = action.payload;
    },
    setCurrentSubmission: (state, action: PayloadAction<any>) => {
      state.currentSubmission = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const { setSubmissions, setCurrentSubmission, setLoading, setError } = submissionSlice.actions;
export default submissionSlice.reducer;
