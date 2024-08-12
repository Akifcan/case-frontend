export interface UserProps {
  name: string
  email: string
  role: 'admin' | 'user'
}

export interface UserState {
  user?: UserProps
  loggedIn?: boolean
}
