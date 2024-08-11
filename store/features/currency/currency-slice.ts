import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../../store'
import { CurrencyProps } from './currency.types'

// Define a type for the slice state
export interface CurrencyState {
  currency: CurrencyProps | undefined
}

// Define the initial state using that type
const initialState: CurrencyState = {
  currency: 'dollar',
}

export const currencySlice = createSlice({
  name: 'currency',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setCurrency: (state, action: PayloadAction<CurrencyProps>) => {
      state.currency = action.payload
    },
  },
})

export const { setCurrency } = currencySlice.actions

// Other code such as selectors can use the imported `RootState` type

export default currencySlice.reducer
