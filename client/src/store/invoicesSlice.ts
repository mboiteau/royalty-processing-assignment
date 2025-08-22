import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import type { InvoiceEntry } from '../types';

interface InvoicesState {
  entries: InvoiceEntry[];
}

const initialState: InvoicesState = {
  entries: [],
};

const invoicesSlice = createSlice({
  name: 'invoices',
  initialState,
  reducers: {
    addInvoiceEntry: (
      state,
      action: PayloadAction<Omit<InvoiceEntry, 'id'>>
    ) => {
      const newEntry: InvoiceEntry = {
        ...action.payload,
        id: Date.now(),
      };
      state.entries.push(newEntry);
    },
    removeInvoiceEntry: (state, action: PayloadAction<number>) => {
      state.entries = state.entries.filter(
        entry => entry.id !== action.payload
      );
    },
    clearInvoiceHistory: state => {
      state.entries = [];
    },
  },
});

export const { addInvoiceEntry, removeInvoiceEntry, clearInvoiceHistory } =
  invoicesSlice.actions;

export default invoicesSlice.reducer;
