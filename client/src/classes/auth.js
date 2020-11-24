export const useAuth =  {
    userId: null,
    login: (userId) => {
        this.userId = userId
    },
    logout: () => {
        this.userId = null
    }
}