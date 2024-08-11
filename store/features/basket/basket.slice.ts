import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { BasketState } from './basket.types'

const initialState: BasketState = {
  count: undefined,
}

export const basketSlice = createSlice({
  name: 'basket',
  initialState,
  reducers: {
    setBasketCount: (state, action: PayloadAction<number>) => {
      state.count = action.payload
    },
  },
})

export const { setBasketCount } = basketSlice.actions

export default basketSlice.reducer
