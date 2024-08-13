export interface CommentProps {
  id: number
  content: string
  createdAt: string
  user: {
    name: string
  }
}

export interface CommentForm {
  comment: string
}
