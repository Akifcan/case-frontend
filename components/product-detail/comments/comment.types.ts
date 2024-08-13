export interface CommentProps {
  id: number
  content: string
  createdAt: string
  user: {
    name: string
  }
}
