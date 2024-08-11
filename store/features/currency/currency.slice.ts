import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { CurrencyProps, CurrencyState } from './currency.types'

const initialState: CurrencyState = {
  currency: 'dollar',
}

export const currencySlice = createSlice({
  name: 'currency',
  initialState,
  reducers: {
    setCurrency: (state, action: PayloadAction<CurrencyProps>) => {
      state.currency = action.payload
    },
  },
})

export const { setCurrency } = currencySlice.actions

export default currencySlice.reducer
