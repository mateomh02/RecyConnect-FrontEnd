import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

import { createAuthSlice } from '@/modules/core/hooks/auth-slice-store'
import type { Nulleable, AuthSlice, AuthState, } from '@/modules'

type Store = AuthSlice

export const useBoundStore = create(
    persist<Store, [], [], Nulleable<AuthState>>(
        (...a) => ({
            ...createAuthSlice(...a)
        }),
        {
            name: 'auth',
            partialize: (state) => {
                const { token, loggedInAt, user } = state

                return {
                    token,
                    loggedInAt,
                    user
                }
            },
            storage: createJSONStorage(() => localStorage, {
                reviver: (_key, value) => {
                    const isoDateRegex =
                        /\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d(\.\d+)?([+-][0-2]\d:[0-5]\d|Z)/

                    if (
                        typeof value === 'string' &&
                        new RegExp(isoDateRegex).exec(value) != null
                    )
                        return new Date(value)

                    return value
                }
            })
        }
    )
)
