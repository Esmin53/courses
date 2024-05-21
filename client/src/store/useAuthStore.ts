import create from "zustand"
import { createJSONStorage, persist } from "zustand/middleware"

type authUserState = {
    currentUser: {
        user: {
            username: string,
            id: string
        },
        token: string
    } | null,
    signIn: (user: {id: string, username: string, token: string}) => void,
    signOut: () => void
}

export const useAuthStore = create<authUserState>()(
    persist(
        (set) => ({
            currentUser: null,
            signIn: (user) => 
                set((state) => {
                    return { currentUser: {
                        user: {
                            username: user.username,
                            id: user.id
                        },
                        token: user.token
                    }}
                }),
                signOut: () => set({ currentUser: null})
        }),
        {
            name: "auth-storage",
            storage: createJSONStorage(() => localStorage)
        }
    )
)