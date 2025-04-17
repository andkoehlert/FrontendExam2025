
export type AuthResponse = {
  data: {
    userId: string,
    token: string,
    user: {
      name: string,
      email: string
    }
  }
}
