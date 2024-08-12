import { configureStore } from '@reduxjs/toolkit'
import { useDispatch, TypedUseSelectorHook, useSelector } from 'react-redux'
import currencyReducer from '@/store/features/currency/currency.slice'
import basketReducer from '@/store/features/basket/basket.slice'
import userReducer from '@/store/features/user/user.slice'

export const store = configureStore({
  reducer: { currency: currencyReducer, basket: basketReducer, user: userReducer },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
