export interface UserProps {
  name: string
  email: string
  role: 'Admin' | 'User'
}

export interface UserState {
  user?: UserProps
  loggedIn?: boolean
}
