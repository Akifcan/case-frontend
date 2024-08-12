export interface UserProps {
  name: string
  email: string
  role: string
}

export interface UserState {
  user?: UserProps
}
