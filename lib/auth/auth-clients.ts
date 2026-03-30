import { createAuthClient } from "better-auth/react"

export const authClient = createAuthClient({
    // baseURL can be inferred automatically in the browser
})

export const { signIn, signUp, signOut, useSession } = authClient;