import type { Nulleable, PartialBy } from '@/modules/core'
import { type StateCreator } from 'zustand'

export interface RoleAuth {
  id: string
  rolName: string
}

export interface LoginUser {
  id: string
  name: string
  email: string
  roleId: number
  role: RoleAuth
}

export interface LoginResponse {
  token: string
  user: LoginUser
}

export interface AuthState extends LoginResponse {
  loggedInAt: Date
}

export interface AuthActions {
  resetAuth: () => void
  setAuth: (auth: PartialBy<AuthState, 'loggedInAt'>) => void
}

export type AuthSlice = Nulleable<AuthState> & AuthActions

const initialState: Nulleable<AuthState> = {
  token: null,
  user: null,
  loggedInAt: null
}

export const createAuthSlice: StateCreator<AuthSlice> = (set) => ({
  ...initialState,
  resetAuth() {
    set(initialState)
  },
  setAuth(newState) {
    set(newState)
  }
})
