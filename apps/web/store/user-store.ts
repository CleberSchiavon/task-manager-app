import { createStore } from 'zustand/vanilla'

export type UserState = {
    token: string | undefined;
    authenticated: boolean;
}
export type UserActions = {
    setToken: (token: string) => void;
    setAuthenticated: (authenticated: boolean) => void;
}

export type UserStore = UserState & UserActions

export const defaultInitState: UserState = {
  token: undefined,
  authenticated: false
}

export const createUserStore = (
  initState: UserState = defaultInitState,
) => {
  return createStore<UserStore>()((set) => ({
    ...initState,
    setToken: (token) => set({ token }),
    setAuthenticated: (authenticated) => set({ authenticated })
  }))
}