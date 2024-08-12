import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { UserProps, UserState } from './user.types'

const initialState: UserState = {
  user: undefined,
  loggedIn: undefined,
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserProps | undefined>) => {
      state.user = action.payload
    },
    setLoggedIn(state, action: PayloadAction<boolean | undefined>) {
      state.loggedIn = action.payload
    },
  },
})

export const { setUser, setLoggedIn } = userSlice.actions

export default userSlice.reducer
